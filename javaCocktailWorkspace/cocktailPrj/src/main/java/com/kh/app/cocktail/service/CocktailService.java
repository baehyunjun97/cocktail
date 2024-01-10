package com.kh.app.cocktail.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kh.app.cocktail.dao.CocktailDao;
import com.kh.app.cocktail.vo.CocktailVo;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CocktailService {

	private final CocktailDao dao;
	private final SqlSessionTemplate sst;
	
	public int regist(CocktailVo vo) throws Exception {
		System.out.println("서비스 진행");
		return dao.regist(sst,vo);
	}

}
