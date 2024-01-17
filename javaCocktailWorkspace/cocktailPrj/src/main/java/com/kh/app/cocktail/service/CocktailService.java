package com.kh.app.cocktail.service;

import java.util.ArrayList;
import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kh.app.cocktail.dao.CocktailDao;
import com.kh.app.cocktail.vo.AmountVo;
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
		
		//saveFiles 에서 사용한 Path를 이름으로 만들어 VO로 저장
		List<String> filePaths = vo.getFilePaths();
		List<String> nameList = new ArrayList<String>();
		
		int iter = 1;
		for (String path : filePaths) {
			String fileName = vo.getNameEng()+"_"+iter;
			nameList.add(fileName);
			iter++;
		}
		
		System.out.println("src이름 리스트(service) : " + nameList);
		vo.setUrlPaths(nameList);
		
		return dao.regist(sst,vo);
	}

	public List<IngVo> searchIng(IngVo vo) {
		return dao.searchIng(sst, vo);
	}

	public List<AmountVo> amountList() {
		return dao.amountList(sst);
	}

	public List<AmountVo> categoryList() {
		return dao.categoryList(sst);
	}

}
