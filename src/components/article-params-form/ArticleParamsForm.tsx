import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import {
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
} from 'src/constants/articleProps';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import React, { useState, useRef } from 'react';
import { useOutsideClickClose } from '../../ui/select/hooks/useOutsideClickClose';
import { useEnterSubmit } from '../../ui/select/hooks/useEnterSubmit';
import { Select } from '../../ui/select';
import { RadioGroup } from '../../ui/radio-group';
import { Separator } from '../../ui/separator';
import { Text } from '../../ui/text';

type ArticleParamsFormProps = {
	btnReset: () => void; // Пропс-функция для сброса настроек
	btnApply: (params: typeof defaultArticleState) => void; // Пропс-функция для применения настроек
};

// объявление функционального компонента ArticleParamsForm
export const ArticleParamsForm = ({
	btnReset,
	btnApply,
}: ArticleParamsFormProps) => {
	// Создание состояния isMenuOpen для управления видимостью меню
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	// Создание состояния selectedBackgroundColor для хранения выбранного цвета фона
	const [selectedBackgroundColor, setBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);

	// Создание состояния selectedFont для хранения выбранного шрифта
	const [selectedFont, setSelectedFont] = useState(
		defaultArticleState.fontFamilyOption
	);

	// Создание состояния selectedFontColor для хранения выбранного цвета шрифта
	const [selectedFontColor, setSelectedFontColor] = useState(
		defaultArticleState.fontColor
	);

	// Создание состояния selectedFontSize для хранения выбранного размера шрифта
	const [selectedFontSize, setSelectedFontSize] = useState(
		defaultArticleState.fontSizeOption
	);

	// Создание состояния selectedContentWidth для хранения выбранной ширины контента
	const [selectedContentWidth, setContentWidth] = useState(
		defaultArticleState.contentWidth
	);

	// Создание двух реф-ссылок для работы с DOM-элементами
	const placeholderRef = useRef<HTMLDivElement | null>(null);
	const ref = useRef<HTMLDivElement | null>(null);

	// Функция для переключения состояния меню (открыто/закрыто)
	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	// Функция для закрытия меню
	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	// Использование хука useOutsideClickClose для закрытия меню при клике вне элемента
	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef: ref,
		onClose: closeMenu,
		onChange: setIsMenuOpen,
	});

	// Использование хука useEnterSubmit для отправки формы по нажатию Enter
	useEnterSubmit({
		placeholderRef,
		onChange: setIsMenuOpen,
	});

	// Функция для сброса всех настроек до значений по умолчанию
	const handleReset = () => {
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		setSelectedFont(defaultArticleState.fontFamilyOption);
		setSelectedFontSize(defaultArticleState.fontSizeOption);
		setSelectedFontColor(defaultArticleState.fontColor);
		btnReset(); // Вызывается внешняя функция сброса настроек
	};

	// Функция для отправки формы и применения новых настроек
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault(); // Предотвращение стандартной отправки формы
		if (btnApply) {
			btnApply({
				// Передача текущих настроек внешней функции btnApply
				backgroundColor: selectedBackgroundColor,
				contentWidth: selectedContentWidth,
				fontFamilyOption: selectedFont,
				fontSizeOption: selectedFontSize,
				fontColor: selectedFontColor,
			});
		}
		setIsMenuOpen(false); // Закрытие меню после отправки формы
	};

	// Возвращение JSX-разметки

	return (
		<>
			<div>
				<ArrowButton onClick={toggleMenu} isOpen={isMenuOpen} />
			</div>
			<aside
				ref={ref} // Присваивание реф-ссылки для формы
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen, // Класс для открытого состояния меню
				})}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифты'
						selected={selectedFont}
						onChange={setSelectedFont}
						options={fontFamilyOptions}
					/>
					<RadioGroup
						title={'Размер шрифта'}
						name={'Размер шрифта'}
						selected={selectedFontSize}
						onChange={setSelectedFontSize}
						options={fontSizeOptions}
					/>
					<Select
						title='Цвет шрифта'
						selected={selectedFontColor}
						onChange={setSelectedFontColor}
						options={fontColors}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={selectedBackgroundColor}
						onChange={setBackgroundColor}
						options={backgroundColors}
					/>
					<Select
						title='Ширина контента'
						selected={selectedContentWidth}
						onChange={setContentWidth}
						options={contentWidthArr}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
