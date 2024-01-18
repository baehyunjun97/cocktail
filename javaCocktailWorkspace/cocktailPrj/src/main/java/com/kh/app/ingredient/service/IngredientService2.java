package com.kh.app.ingredient.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.kh.app.cocktail.dao.CocktailDao2;
import com.kh.app.cocktail.service.CocktailService2;
import com.kh.app.cocktail.vo.CocktailVo2;
import com.kh.app.cocktail.vo.IngredientVo2;
import com.kh.app.filter.vo.FilterVo;
import com.kh.app.ingredient.dao.IngredientDao2;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class IngredientService2 {

	private final IngredientDao2 dao;
	private final CocktailDao2 cocktaildao;
	private final SqlSessionTemplate sst;
	private final CocktailService2 cocktailService;
	private final HttpServletRequest req;

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

	// 재료 업로드
	public Map<String, String> ingUpload(MultipartFile file, IngredientVo2 vo) throws IllegalStateException, IOException {
		
		// 업로드 후 파일이름 리턴받음
		String fileName = fileUpload(file);
		
		// vo에 파일 이름 저장
		vo.setIngSrc(fileName);
		
		// 업데이트된 값result를 얻어옴
		int result = dao.ingUpload(vo,sst);
		
		// 메세지를 담은 map
		Map<String, String> map = new HashMap<>();
		
		// result가 1이면 성공 0이면 실패
		map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}
		
		// return
		return map;
		
	}
	
	// 옵션 리스트 조회
	public Map<String, Object> categoryList(){
		
		 List<IngredientVo2> baseList = dao.baseList(sst);
		 List<IngredientVo2> categoryList = dao.categoryList(sst);
		 
		 Map<String, Object> map = new HashMap<String, Object>();
		 map.put("categoryList", categoryList);
		 map.put("baseList", baseList);
		 
		return map;
		
	}

	// 파일 업로드 메소드
	private String fileUpload(MultipartFile file) throws IllegalStateException, IOException {
		
		// 운영체제마다 separator를 설정해줌
		String sep = File.separator;
		
		// 랜덤이름 날짜+핸덤문자열
		String randomName = System.nanoTime() + "_" + UUID.randomUUID();
		
		// 파일이름
		String submittedFileName = file.getOriginalFilename();
		
		// 마지막 기준 .으로 확장자 인덱스 구해옴
		int index = submittedFileName.lastIndexOf(".");
		
		// 인덱스의 길이만큼 문자열을 제거
		String ext = submittedFileName.substring(index);
		
		// 랜덤 이름 + 확장자
		String fileName = randomName + ext;
		
		// 톰캣 상대경로설정
		String tomcatPath = req.getServletContext().getRealPath(sep+"resources"+sep+"upload"+sep+"cocktail"+sep+"image"+sep);
		
		// 톰캣경로 + 랜덤파일이름
		String imgDir = tomcatPath + fileName;
		
		// 파일생성후 업로드
		File target = new File(imgDir);
		file.transferTo(target);
		
		// 랜덤 파일이름 리턴
		return fileName;
	}
	
}
