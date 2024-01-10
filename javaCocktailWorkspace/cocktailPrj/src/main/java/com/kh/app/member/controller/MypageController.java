package com.kh.app.member.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.app.cocktail.vo3.CocktailVo3;
import com.kh.app.member.service.MemberService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("mypage")
@CrossOrigin("*")
public class MypageController {
	
	private final MemberService ms;
	
	//업로드
	@GetMapping("upload")
	public List<CocktailVo3> upload(CocktailVo3 cvo){
		System.out.println("fetch 통해서 받은 데이터:"+cvo);
		List<CocktailVo3> result=ms.upload(cvo);
	
		return result;
	}
	
	//즐겨찾기
	@GetMapping("bookmark")
	public List<CocktailVo3> bookmark(CocktailVo3 cvo){
		System.out.println("fetch 통해서 받은 데이터:"+cvo);
		List<CocktailVo3> result=ms.bookmark(cvo);
		
		return result;
	}
	
}
