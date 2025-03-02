import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import {
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import React, { useState, useRef } from 'react';
import { useOutsideClickClose } from '../../ui/select/hooks/useOutsideClickClose';
import { Select } from '../../ui/select';
import { RadioGroup } from '../../ui/radio-group';
import { Separator } from '../../ui/separator';
import { Text } from '../../ui/text';

type ArticleParamsFormProps = {
	setArticleParams: (params: ArticleStateType) => void;
	initialValues?: ArticleStateType;
};

export const ArticleParamsForm = ({
	setArticleParams,
	initialValues = defaultArticleState,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [selectedBackgroundColor, setBackgroundColor] = useState(
		initialValues.backgroundColor
	);
	const [selectedFont, setSelectedFont] = useState(
		initialValues.fontFamilyOption
	);
	const [selectedFontColor, setSelectedFontColor] = useState(
		initialValues.fontColor
	);
	const [selectedFontSize, setSelectedFontSize] = useState(
		initialValues.fontSizeOption
	);
	const [selectedContentWidth, setContentWidth] = useState(
		initialValues.contentWidth
	);
	const ref = useRef<HTMLDivElement | null>(null);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef: ref,
		onClose: closeMenu,
		onChange: setIsMenuOpen,
	});

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setArticleParams({
			backgroundColor: selectedBackgroundColor,
			contentWidth: selectedContentWidth,
			fontFamilyOption: selectedFont,
			fontSizeOption: selectedFontSize,
			fontColor: selectedFontColor,
		});
		setIsMenuOpen(false);
	};

	const handleReset = () => {
		setBackgroundColor(initialValues.backgroundColor);
		setContentWidth(initialValues.contentWidth);
		setSelectedFont(initialValues.fontFamilyOption);
		setSelectedFontSize(initialValues.fontSizeOption);
		setSelectedFontColor(initialValues.fontColor);
		setArticleParams(initialValues);
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
