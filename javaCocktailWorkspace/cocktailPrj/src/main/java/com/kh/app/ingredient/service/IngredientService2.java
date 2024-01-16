package com.kh.app.ingredient.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.kh.app.cocktail.dao.CocktailDao2;
import com.kh.app.cocktail.service.CocktailService2;
import com.kh.app.cocktail.vo.CocktailVo2;
import com.kh.app.cocktail.vo.IngredientVo2;
import com.kh.app.filter.vo.FilterVo;
import com.kh.app.ingredient.dao.IngredientDao2;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class IngredientService2 {

	private final IngredientDao2 dao;
	private final CocktailDao2 cocktaildao;
	private final SqlSessionTemplate sst;
	private final CocktailService2 cocktailService;

	// 재료 전체 조회 및 필터
	public List<IngredientVo2> list(FilterVo filterVo) {
		return dao.list(filterVo , sst);
	}

	// 재료 상세조회
	public Map<String, Object> detail(FilterVo filterVo) {
		
		IngredientVo2 ingredientVo = null;
		
		// 상제조회한 재료 vo
		List<IngredientVo2> voList = dao.detail(filterVo, sst);
		
		// 사이즈가 0이 아니면 ingredientVo에 0번째 리스트를 할당
		if(voList.size() != 0){
			ingredientVo = voList.get(0);
		}
		
		// 재료로 만들 수 있는 칵테일 조회
		List<CocktailVo2> receivedCocktails = cocktaildao.ingredientDetail(sst,filterVo);
		
		// 중복이 제거되고 baseNameList를 가지고 있는 List
		List<CocktailVo2> cocktailVoList = cocktailService.mergeDuplicateCocktails(receivedCocktails);
        
		// 알콜 도수에 따라 문자열로 변경해주는 메소드
		cocktailService.assignAlcoholStrength(cocktailVoList);
		
		// 맵에 저장하여 리턴
		Map<String,Object> map = new HashMap<>();
		map.put("ingredientVo", ingredientVo);
		map.put("cocktailVoList", cocktailVoList);
		
		return map;
	}

}
