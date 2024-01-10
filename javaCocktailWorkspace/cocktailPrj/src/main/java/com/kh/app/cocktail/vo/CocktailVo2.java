package com.kh.app.cocktail.vo;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class CocktailVo2 {
	private String alc;
	private String alcoholStrength;
	private String cocktailNo;
	private String memberNo;
	private String nameKor;
	private String nameEng;
	private String commentary;
	private String recipeExplan;
	private String cocktailFileName;
	private String writerName;
	
	private String ingCnt;
	private String likeYn;
	private String likeCnt;
	private String baseName;
	private String amountName;
	private String amount;
	
	private List<String> cocktailFileNameList = new ArrayList<>();
	private List<String> baseNameList = new ArrayList<>();
	
}
