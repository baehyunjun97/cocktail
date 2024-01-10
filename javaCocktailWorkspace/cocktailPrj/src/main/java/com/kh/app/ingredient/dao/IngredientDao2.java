package com.kh.app.ingredient.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.app.cocktail.vo.IngredientVo2;
import com.kh.app.filter.vo.FilterVo;

@Repository
public class IngredientDao2 {
	
	// 재료 상세조회
		public List<IngredientVo2> detail(FilterVo filterVo, SqlSessionTemplate sst) {
			return sst.selectList("IngredientMapper2.detail",filterVo);
		}
		//칵테일 재료 상세조회
		public List<IngredientVo2> cocktailDetail(FilterVo filterVo, SqlSessionTemplate sst) {
			return sst.selectList("IngredientMapper2.cocktailDetail",filterVo);
		}

		// 재료 검색
		public List<IngredientVo2> search(FilterVo filterVo, SqlSessionTemplate sst) {
			return sst.selectList("IngredientMapper2.search",filterVo);
		}

		// 호버이벤트
		public List<IngredientVo2> retrieveMouseOverDetails(SqlSessionTemplate sst, FilterVo filterVo) {
			return sst.selectList("IngredientMapper2.mouseOverEvent",filterVo);
		}

		// 재료 전체조회 및 필터
		public List<IngredientVo2> list(FilterVo filterVo, SqlSessionTemplate sst) {
			return sst.selectList("IngredientMapper2.list",filterVo);
		}

}
