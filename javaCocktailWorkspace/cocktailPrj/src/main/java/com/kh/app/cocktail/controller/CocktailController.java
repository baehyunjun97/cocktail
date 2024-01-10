package com.kh.app.cocktail.controller;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.app.cocktail.service.CocktailService;
import com.kh.app.cocktail.vo.CocktailVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/app/cocktail")
@CrossOrigin("*") //모든 출처 오픈 (칵테일사진)
public class CocktailController {

	private final CocktailService service;
	
	
//	@GetMapping("/regist")
//	public List<String> viewRegist() {
//		return Arrays.asList("Item 1", "Item 2", "Item 3");
//	}

	//TODO return good은 칵테일 리스트(기본화면)으로 이동시킨다. 가칭 home
	@PostMapping("/regist")
	public Map<String, Object> Regist(@RequestBody CocktailVo vo) throws IOException {
		
		Map<String, Object> map = null;
		try {
			System.out.println(vo);
			System.out.println(vo.getRecipe());
			int result = service.regist(vo);
			System.out.println("컨트롤러 결과 : " + result);
			
			map = new HashMap<String, Object>();
			map.put("msg", "good");
			
		} catch (Exception e) {
			System.out.println("칵테일 등록 실패");
			map = new HashMap<String, Object>();
			map.put("msg", "bad");
			e.printStackTrace();
		}
		
		return map;
	}
}
