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
	
	// 마우스 오버 이벤트 발생시
	public List<IngredientVo2> retrieveMouseOverDetails(FilterVo filterVo) {
	    List<IngredientVo2> ingredientVoList = dao.retrieveMouseOverDetails(sst, filterVo);
	    
	    System.out.println(ingredientVoList);
	    
	    // 계산한 값을 voList에 할당
	    assignAlcoholStrength(ingredientVoList,calculateAlcoholStrength(ingredientVoList));

	    return ingredientVoList;
	}
	
	// 도수를 계산하는 메소드
	private int calculateAlcoholStrength(List<IngredientVo2> ingredientVoList) {
		// 도수 계산
	    int total = 0;
	    int ml = 0;
	    for (IngredientVo2 ingVo : ingredientVoList) {
	        if (ingVo.getAmountName().contains("ml")) {
	            total += (Integer.parseInt(ingVo.getAmount()) * Integer.parseInt(ingVo.getAlc()));
	            ml += Integer.parseInt(ingVo.getAmount());
	        }
	    }
	    int result = total/ml;
	    return result;
	}

	// 계산한 값을 voList에 할당하는 메소드
	private void assignAlcoholStrength(List<IngredientVo2> ingredientVoList, int result) {
	   

	    // 계산한 값을 voList에 할당
	    for (IngredientVo2 ingVo : ingredientVoList) {
	        if (result < 20) {
	            ingVo.setAlc("약한도수");
	        } else if (result >= 20) {
	            ingVo.setAlc("강한도수");
	        } else {
	            ingVo.setAlc("무알콜");
	        }
	    }
	}

	// 재료 전체 조회 및 필터
	public List<IngredientVo2> list(FilterVo filterVo) {
		return dao.list(filterVo , sst);
	}

	// 재료 상세조회
	public Map<String, Object> detail(FilterVo filterVo) {
		
		IngredientVo2 ingredientVo = null;
		
		// 상제조회한 재료 vo
		List<IngredientVo2> voList = dao.detail(filterVo, sst);
		if(voList.size() != 0){
			ingredientVo = voList.get(0);
		}
		
		// 재료로 만들 수 있는 칵테일 조회
		List<CocktailVo2> receivedCocktails = cocktaildao.ingredientDetail(sst,filterVo);
		
		// linked맵을 이용해 순서를 보장하여 칵테일 번호를 키값으로 vo를 저장
        LinkedHashMap<String, CocktailVo2> cocktailMap = new LinkedHashMap<>();
        LinkedHashMap<String, List<String>> ingBaseNameMap = new LinkedHashMap<>();

        for (CocktailVo2 cocktailVo : receivedCocktails) {
        	cocktailMap.put(cocktailVo.getCocktailNo(), cocktailVo);
            if(cocktailVo.getBaseName() != null) {
            	ingBaseNameMap.computeIfAbsent(cocktailVo.getCocktailNo(), k -> new ArrayList<>())
                .add(cocktailVo.getBaseName());
            }          
        }

        // 칵테일 리스트에 map에 모든 value값을 할당
        List<CocktailVo2> cocktailVoList = new ArrayList<>(cocktailMap.values());

        for (CocktailVo2 cocktailVo : cocktailVoList) {
            List<String> baseNameList = ingBaseNameMap.get(cocktailVo.getCocktailNo());

            if (baseNameList != null) {
                List<String> filteredList = baseNameList.stream()
                        .filter(baseName -> baseName != null)
                        .distinct()
                        .collect(Collectors.toList());

                cocktailVo.setBaseNameList(filteredList);   
            }
        }
        
        assignAlcoholStrength(cocktailVoList);
		
		Map<String,Object> map = new HashMap<>();
		map.put("ingredientVo", ingredientVo);
		map.put("cocktailVoList", cocktailVoList);
		
		return map;
	}
	
	// 계산한 값을 voList에 할당하는 메소드
	private void assignAlcoholStrength(List<CocktailVo2> voList) {
	   

	    // 계산한 값을 voList에 할당
	    for (CocktailVo2 vo : voList) {
	        if (Integer.parseInt(vo.getAlc()) < 20) {
	        	vo.setAlcoholStrength("약한도수");
	        } else if (Integer.parseInt(vo.getAlc()) >= 20) {
	        	vo.setAlcoholStrength("강한도수");
	        } else {
	        	vo.setAlcoholStrength("무알콜");
	        }
	    }
	}

}
