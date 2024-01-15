package com.kh.app.cocktail.service;

import java.util.ArrayList;
import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kh.app.cocktail.dao.CocktailDao;
import com.kh.app.cocktail.vo.CocktailVo;
import com.kh.app.cocktail.vo.IngVo;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CocktailService {

	private final CocktailDao dao;
	private final SqlSessionTemplate sst;
	
	public int regist(CocktailVo vo) throws Exception {
		System.out.println("서비스 진행");
		
		//saveFiles 에서 사용한 Path를 Url로 만들어 VO로 저장
		List<String> filePaths = vo.getFilePaths();
		List<String> urlList = new ArrayList<String>();
		
		for (String path : filePaths) {
			String fileUrl = path.replace("C:\\dev\\cocktailRepo\\javaCocktailWorkspace\\cocktailPrj\\src\\main\\webapp", "http://127.0.0.1:8888/app");
			urlList.add(fileUrl);
		}
		
		System.out.println("url 리스트 : " + urlList);
		vo.setUrlPaths(urlList);
		
		return dao.regist(sst,vo);
	}

	public List<IngVo> searchIng(IngVo vo) {
		return dao.searchIng(sst, vo);
	}

}
