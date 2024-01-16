package com.kh.app.cocktail.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.app.cocktail.vo.CocktailVo2;
import com.kh.app.filter.vo.FilterVo;

@Repository
public class CocktailDao2 {
	
	// 칵테일 전체 조회
    public List<CocktailVo2> list(SqlSessionTemplate sst, FilterVo filterVo) {
        // mapper 다녀오기
        return sst.selectList("CocktailMapper2.list", filterVo);
    }
    
    // 재료로 만들수 있는 칵테일
    public List<CocktailVo2> ingredientDetail(SqlSessionTemplate sst, FilterVo filterVo) {
    	// mapper 다녀오기
    	return sst.selectList("CocktailMapper2.ingredientDetail", filterVo);
    }

    // 칵테일 상세조회
    public List<CocktailVo2> detail(FilterVo filterVo, SqlSessionTemplate sst) {
        // mapper 다녀오기
        return sst.selectList("CocktailMapper2.detail", filterVo);
    }
    
    // 검색
    public List<CocktailVo2> search(SqlSessionTemplate sst, FilterVo filterVo) {
        // mapper 다녀오기
        return sst.selectList("CocktailMapper2.search", filterVo);
    }
    
}
