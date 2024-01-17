package com.kh.app.cocktail.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.app.cocktail.service.CocktailService2;
import com.kh.app.cocktail.vo.CocktailVo2;
import com.kh.app.filter.vo.FilterVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("cocktail")
@CrossOrigin
public class CocktailController2 {
	
	private final CocktailService2 service;
	
	// 칵테일 전체 조회
	@GetMapping("list")
	public List<CocktailVo2> showCocktailList(FilterVo filterVo) throws Exception {
		return service.list(filterVo);
	}
	
	// 칵테일 상세 조회
	@GetMapping("detail")
	public Map<String,Object> detail(FilterVo filterVo) {
		return service.detail(filterVo);
	}
	
	// 칵테일 검색 조회
	@GetMapping("search")
	public Map<String,Object> search(FilterVo filterVo) {
		return service.search(filterVo);
	}
	
	// 랭킹 top10 조회
	@GetMapping("ranking")
	public List<CocktailVo2> ranking(){
		return service.ranking();
	}
	
}
