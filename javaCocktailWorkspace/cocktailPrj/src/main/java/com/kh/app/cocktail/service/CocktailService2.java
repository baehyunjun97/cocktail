package com.kh.app.cocktail.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kh.app.cocktail.dao.CocktailDao2;
import com.kh.app.cocktail.vo.CocktailVo2;
import com.kh.app.cocktail.vo.IngredientVo2;
import com.kh.app.filter.vo.FilterVo;
import com.kh.app.ingredient.dao.IngredientDao2;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class CocktailService2 {

	private final CocktailDao2 cocktailDao;
	private final IngredientDao2 ingDao;
	private final SqlSessionTemplate sst;
	
	// 칵테일 전체 조회
	public List<CocktailVo2> list(FilterVo filterVo) {
		
		if (filterVo != null) {
		    if ("null".equals(filterVo.getItemMax()) || "null".equals(filterVo.getItemMin())) {
		        filterVo.setItemMax(null);
		        filterVo.setItemMin(null);
		    }
		    if ("undefined".equals(filterVo.getItemMax()) || "undefined".equals(filterVo.getItemMin())) {
		        filterVo.setItemMax(null);
		        filterVo.setItemMin(null);
		    }
		    if ("재료수".equals(filterVo.getItemMax()) || "재료수".equals(filterVo.getItemMin())) {
		        filterVo.setItemMax(null);
		        filterVo.setItemMin(null);
		    }
		}
		
		// dao호출
		List<CocktailVo2> voList = cocktailDao.list(sst,filterVo);
		
		// linked맵을 이용해 순서를 보장하여 칵테일 번호를 키값으로 vo를 저장
        LinkedHashMap<String, CocktailVo2> map = new LinkedHashMap<>();
        LinkedHashMap<String, List<String>> ingBaseNameMap = new LinkedHashMap<>();

        for (CocktailVo2 cocktailVo : voList) {
            map.put(cocktailVo.getCocktailNo(), cocktailVo);
            if(cocktailVo.getBaseName() != null) {
            	ingBaseNameMap.computeIfAbsent(cocktailVo.getCocktailNo(), k -> new ArrayList<>())
                .add(cocktailVo.getBaseName());
            }          
        }

        // 칵테일 리스트에 map에 모든 value값을 할당
        List<CocktailVo2> cocktailVoList = new ArrayList<>(map.values());

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
		
		return  cocktailVoList;
		
	}

	// 칵테일 상세조회
	public Map<String,Object> detail(FilterVo filterVo) {
		
		// 칵테일 상세조회
		List<CocktailVo2> cocktailVoList = cocktailDao.detail(filterVo,sst);
		
		assignAlcoholStrength(cocktailVoList);
		
		// 중복제거 로직
        LinkedHashMap<String, CocktailVo2> cocktailMap = new LinkedHashMap<>();
        LinkedHashMap<String, List<String>> cocktailFileNameMap = new LinkedHashMap<>();

        // 첨부 파일만 or 한 칵테일 vo만 저장
        for (CocktailVo2 cocktailVo : cocktailVoList) {
        	cocktailMap.put(cocktailVo.getCocktailNo(), cocktailVo);

        	cocktailFileNameMap.computeIfAbsent(cocktailVo.getCocktailNo(), k -> new ArrayList<>())
                    .add(cocktailVo.getCocktailFileName());
        } 

        // 칵테일 vo에 저장
        CocktailVo2 cocktailVo = new ArrayList<>(cocktailMap.values()).get(0);

        // 칵테일 vo안에 파일리스트에 가공한 파일데이터 저장
        cocktailVo.setCocktailFileNameList(cocktailFileNameMap.get(cocktailVo.getCocktailNo()));
		
        
        // 재료조회
		List<IngredientVo2> ingredientVoList = ingDao.cocktailDetail(filterVo,sst);
		
		Map<String,Object> map = new HashMap<>();
		
		map.put("cocktailVo", cocktailVo);
		map.put("ingredientVoList", ingredientVoList);
		
		// dao호출 
		return map;
	}

	// 칵테일/재료 검색 
	public Map<String, Object> search(FilterVo filterVo) {
		
		// dao호출
		List<CocktailVo2> voList = cocktailDao.search(sst,filterVo);
		
		// linked맵을 이용해 순서를 보장하여 칵테일 번호를 키값으로 vo를 저장
        LinkedHashMap<String, CocktailVo2> map = new LinkedHashMap<>();
        LinkedHashMap<String, List<String>> ingBaseNameMap = new LinkedHashMap<>();

        for (CocktailVo2 cocktailVo : voList) {
            map.put(cocktailVo.getCocktailNo(), cocktailVo);
            if(cocktailVo.getBaseName() != null) {
            	ingBaseNameMap.computeIfAbsent(cocktailVo.getCocktailNo(), k -> new ArrayList<>())
                .add(cocktailVo.getBaseName());
            }          
        }

        // 칵테일 리스트에 map에 모든 value값을 할당
        List<CocktailVo2> cocktailVoList = new ArrayList<>(map.values());

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

        
        // 재료조회
		List<IngredientVo2> ingredientVoList = ingDao.search(filterVo,sst);
		
		Map<String,Object> vomap = new HashMap<>();
		
		vomap.put("cocktailVoList", cocktailVoList);
		vomap.put("ingredientVoList", ingredientVoList);
		
		return vomap;
		
	}

		// 계산한 값을 voList에 할당하는 메소드
		private void assignAlcoholStrength(List<CocktailVo2> voList) {

		    // 계산한 값을 voList에 할당
		    for (CocktailVo2 vo : voList) {
		    	int alc = Integer.parseInt(vo.getAlc());
		        if (alc < 20 && alc > 1) {
		        	vo.setAlcoholStrength("약한도수");
		        } else if (alc >= 20) {
		        	vo.setAlcoholStrength("강한도수");
		        } else {
		        	vo.setAlcoholStrength("무알콜");
		        }
		    }
		}


}
