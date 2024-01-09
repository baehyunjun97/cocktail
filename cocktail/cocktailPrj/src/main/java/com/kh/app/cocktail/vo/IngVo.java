package com.kh.app.cocktail.vo;

import lombok.Data;

@Data
public class IngVo {
	private String no;
	private String categoryNo;
	private String name;
	private String explanation;
	private String src;
	private String status;
	private String base;
	private String alc; //재료의 알콜도수 
}
