package com.kh.app.cocktail.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.kh.app.cocktail.service.CocktailService;
import com.kh.app.cocktail.vo.CocktailVo;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@CrossOrigin("*") //모든 출처 오픈 (칵테일사진)
public class CocktailController {

	private final CocktailService cs;

	//TODO return은 칵테일 리스트(기본화면)으로 이동시킨다. 가칭 home
	@PostMapping("cocktail/regist")
	public Map<String, Object> Regist(@RequestBody CocktailVo vo) throws IOException {
		
		Map<String, Object> map = null;
		try {
			System.out.println(vo);
			System.out.println(vo.getRecipe());
			int result = cs.regist(vo);
			System.out.println("컨트롤러 결과 : " + result);
			
			map = new HashMap<String, Object>();
			map.put("msg", "good");
			
		} catch (Exception e) {
			System.out.println("칵테일 등록 실패");
			map.put("msg", "bad");
			e.printStackTrace();
		}
		
		return map;
	}
}
