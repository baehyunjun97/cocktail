package com.kh.app.ingredient.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
	private final ResourceLoader resourceLoader;
	
	// 재료 전체조회 및 필터
	@GetMapping("list")
	public List<IngredientVo2> list(FilterVo filterVo){
		return service.list(filterVo);
	}
	
	// 재료 상세조회
	@GetMapping("detail")
	public Map<String,Object> detail(FilterVo filterVo){
		return service.detail(filterVo);
	}
	
	// 재료 업로드
	@PostMapping
	private Map<String, String> ingUpload(MultipartFile file,
	                                     @RequestParam("name_kor") String nameKor,
	                                     @RequestParam("name_eng") String nameEng,
	                                     @RequestParam("category") String category,
	                                     @RequestParam("guide") String guide) throws IOException {

	    Map<String, String> map = new HashMap<>();
	    map.put("msg", "good");

	    return map;
	}
	
}
