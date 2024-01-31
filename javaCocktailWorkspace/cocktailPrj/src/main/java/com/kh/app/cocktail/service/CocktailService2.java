package com.kh.app.cocktail.service;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.function.Function;
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
	public List<CocktailVo2> list(FilterVo filterVo) throws Exception {
		
		// vo null 체크
		Objects.requireNonNull(filterVo, "filterVo가 널 값임");
		
		// filterVo null undefined 재료수인지 확인하는 메소드
		initializeObject(filterVo.getClass().getDeclaredFields(), filterVo);
		
		// dao호출
		List<CocktailVo2> voList = cocktailDao.list(sst,filterVo);

		// 중복되는 리스트를 합쳐 리스트로 반환하는 메소드
        List<CocktailVo2> cocktailVoList= mergeDuplicateCocktails(voList);
        
        // 알코 도수에 따라 문자열로 변경해주는 메소드
        assignAlcoholStrength(cocktailVoList);
		
		return  cocktailVoList;
		
	}

	// 칵테일 상세조회 
	public Map<String,Object> detail(FilterVo filterVo) {
		
		// 칵테일 상세조회
		List<CocktailVo2> cocktailVoList = cocktailDao.detail(filterVo,sst);
		
		CocktailVo2 cocktailVo = extractUniqueFileSrcFromCocktails(cocktailVoList);
		
		assignAlcoholStrength(cocktailVoList);
        
        // 재료조회
		List<IngredientVo2> ingredientVoList = ingDao.cocktailDetail(filterVo,sst);
		
		// 맵에 저장하여 리턴
		Map<String,Object> map = new HashMap<>();
		
		map.put("cocktailVo", cocktailVo);
		map.put("ingredientVoList", ingredientVoList);
		
		// dao호출 
		return map;
	}

	// 칵테일/재료 검색 
	public Map<String, Object> search(FilterVo filterVo) {
		
		// dao호출
		List<CocktailVo2> cocktailDbVoList = cocktailDao.search(sst,filterVo);
		
		// 중복되는 리스트를 합쳐 리스트로 반환하는 메소드
        List<CocktailVo2> cocktailVoList= mergeDuplicateCocktails(cocktailDbVoList);
        
        // 알코 도수에 따라 문자열로 변경해주는 메소드
        assignAlcoholStrength(cocktailVoList);
        
        // 재료조회
		List<IngredientVo2> ingredientVoList = ingDao.search(filterVo,sst);
		
		// 맵에 저장하여 리턴
		Map<String,Object> vomap = new HashMap<>();
		
		vomap.put("cocktailVoList", cocktailVoList);
		vomap.put("ingredientVoList", ingredientVoList);
		
		return vomap;
		
	}

	// 랭킹 top 10 조회
	public List<CocktailVo2> ranking() {
		return cocktailDao.ranking(sst); 
	}
	
	// 알콜 계산 메소드
	public void assignAlcoholStrength(List<CocktailVo2> voList) {

	    // 계산한 값을 voList에 할당
	    for (CocktailVo2 vo : voList) {
	    	int alc = Integer.parseInt(vo.getAlc());
	        if (alc < 20 && alc >= 1) {
	        	vo.setAlcoholStrength("약한도수");
	        } else if (alc >= 20) {
	        	vo.setAlcoholStrength("강한도수");
	        } else {
	        	vo.setAlcoholStrength("무알콜");
	        }
	    }
	}

	// 원하는 문자열 체크후 비교후 null로 변환하는 매소드
	private void initializeObject(Field[] fields,Object obj) {
		for (Field field : fields) {
	        field.setAccessible(true);
	        try {
	            Object value = field.get(obj);

	            Optional.ofNullable(value)
	                    .filter(val -> "null".equals(val) || "undefined".equals(val) || "재료수".equals(val))
	                    .ifPresent(val -> {
	                        try {
	                            field.set(obj, null);
	                        } catch (IllegalAccessException e) {
	                            e.printStackTrace(); // 예외 처리 필요
	                        }
	                    });
	        } catch (IllegalAccessException e) {	
	            e.printStackTrace(); // 예외 처리 필요
	        }
	    }
	}
	
	//칵테일 voList에 중복되는 리스트를 한개의 객체로 변환하여 다른 list에 담아주는 메소드
	public List<CocktailVo2> mergeDuplicateCocktails(List<CocktailVo2> voList) {
		
		// linked맵을 이용해 순서를 보장하여 칵테일 번호를 키값으로 vo를 저장
        LinkedHashMap<String, CocktailVo2> map = new LinkedHashMap<>();
        LinkedHashMap<String, List<String>> ingBaseNameMap = new LinkedHashMap<>();
		
		for (CocktailVo2 cocktailVo : voList) {
	        	
			// cocktailNo는 고유하므로 번호당 하나의 vo를 저장
		    map.put(cocktailVo.getCocktailNo(), cocktailVo);
		    
		    // baseName이 null이 아니라면 칵테일 넘버를 키 값으로 BaseName만 계속 저장
		    if(cocktailVo.getBaseName() != null) {
		    	ingBaseNameMap.computeIfAbsent(cocktailVo.getCocktailNo(), k -> new ArrayList<>())
		        .add(cocktailVo.getBaseName());
		    }    
	        
	    }
		
		// 칵테일 리스트에 map에 모든 value값을 list로 저장
        List<CocktailVo2> cocktailVoList = new ArrayList<>(map.values());
        
        processAndSetBaseNames(cocktailVoList,ingBaseNameMap);
        
        return cocktailVoList;
	
	}
	
	// baseName의 이미 가공된 중복되는 데이터를 리스트로 만들어 vo에 저장해주는 메소드
	private void processAndSetBaseNames(List<CocktailVo2> cocktailVoList, LinkedHashMap<String, List<String>> ingBaseNameMap) {
		
		for (CocktailVo2 cocktailVo : cocktailVoList) {
		        	
	        	// baseName의 값을 저장하고 있는 map의 list를 칵테일번호 값에 따라 baseNameList에 저장
	            List<String> baseNameList = ingBaseNameMap.get(cocktailVo.getCocktailNo());
	
	            // baseName이 null이 아니면 실행
	            if (baseNameList != null) {
	            	
	            	// baseNameList를 스트림으로 변경하여 baseName의 중복데이터를 제거하고 리스트 형식으로 반환
	                List<String> filteredList = baseNameList.stream()
	                        .filter(baseName -> baseName != null)
	                        .distinct()
	                        .collect(Collectors.toList());
	
	                // 그 후 vo에 baseNameList에 저장
	                cocktailVo.setBaseNameList(filteredList);   
	            }
	    }
		
	}
	
	// 칵테일 리스트에서 중복리스트 제거후 fileSrc만 저장해서 반환하는 메소드 
	private CocktailVo2 extractUniqueFileSrcFromCocktails(List<CocktailVo2> cocktailVoList) {
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
        
        return cocktailVo;
	}
}
