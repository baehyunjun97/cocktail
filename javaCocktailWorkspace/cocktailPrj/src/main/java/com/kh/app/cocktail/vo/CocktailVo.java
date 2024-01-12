package com.kh.app.cocktail.vo;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CocktailVo {

	private String no; //칵테일 번호
	private String nameKor; //한국이름
	private String nameEng; //영문이름
	private String commentary; //칵테일 설명
	private String delYn; //칵테일 설명
	private String recipeExplan; //레시피설명
	private String categoryNo; //카테고리 넘버(1~9, sweet 등등)
	private int item; //재료수
	private String memberNo; //작성자 번호
	
	private String memberName; // 작성자 이름(join)
	
	private String ingNo; // 재료 넘버
	private String ingName; // 재료 이름
	private String ingExplan; // 재료 설명
	private String ingSrc; // 재료 사진(1장)
	private String ingDelYn; // 재료 사용여부
	private String ingCategory; // 재료 사용여부
	
	private List<MultipartFile> imgList; //이미지 리스트
	private List<RecipeVo> recipe; //재료 리스트
	private String recipeListJsonStr; //재료 리스트
	
	private String base; // 베이스주 재료 사용여부
	private int alc; // 알코올 도수 (null == 무알콜)	
	
	private String amountNo; // 용량 (이름)
	private int amount; // 용량 (숫자)
	
	
	
	
	
}
