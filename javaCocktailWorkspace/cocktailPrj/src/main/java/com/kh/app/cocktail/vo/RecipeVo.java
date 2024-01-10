package com.kh.app.cocktail.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class RecipeVo {
	
	private String cocktailNo;
	private String ingNo;
	private String amountNo; //용량단위
	private int amount; //재료의 용량
	
	private int alc; //join Ing 재료의 알콜도수
}
