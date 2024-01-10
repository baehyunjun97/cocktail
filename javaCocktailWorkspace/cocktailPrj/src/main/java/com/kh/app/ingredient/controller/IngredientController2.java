package com.kh.app.ingredient.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.app.cocktail.vo.IngredientVo2;
import com.kh.app.filter.vo.FilterVo;
import com.kh.app.ingredient.service.IngredientService2;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("ingredient")
@CrossOrigin("*")
public class IngredientController2 {
	
	private final IngredientService2 service;
	
	// 호버시 이벤트 발생
	@GetMapping("event")
	public List<IngredientVo2> retrieveMouseOverDetails(FilterVo filterVo) {
		System.out.println(filterVo);
		return service.retrieveMouseOverDetails(filterVo);
	}
	
	// 재료 전체조회 및 필터
	@GetMapping("list")
	public List<IngredientVo2> list(FilterVo filterVo){
		return service.list(filterVo);
	}
	
	// 재료 상세조회
	@GetMapping("detail")
	public Map<String,Object> detail(FilterVo filterVo){
		System.out.println(filterVo);
		return service.detail(filterVo);
	}
	
}
