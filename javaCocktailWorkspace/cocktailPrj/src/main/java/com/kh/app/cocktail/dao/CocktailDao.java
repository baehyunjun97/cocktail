package com.kh.app.cocktail.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.app.cocktail.vo.CocktailVo;
import com.kh.app.cocktail.vo.RecipeVo;

@Repository
public class CocktailDao {

    // 칵테일 등록
    public int regist(SqlSessionTemplate sst, CocktailVo vo) throws Exception {
        int registRecipe = registRecipe(sst, vo.getRecipe());
        
        if(registRecipe < 1) {
            throw new Exception("레시피 등록 실패");
        }
        
        int alc = calcAlcCocktail(sst, vo.getRecipe());
        int item = vo.getRecipe().size();
        vo.setAlc(alc);
        vo.setItem(item);

        return sst.insert("CocktailMapper.registCocktail", vo);
    }

	// recipe 등록
	public int registRecipe(SqlSessionTemplate sst, List<RecipeVo> list) {
		int result = sst.insert("CocktailMapper.registRecipe", list);
		System.out.println("레시피 등록개수 : "+result);
		return result;
	}

	// 칵테일 alc 계산 - recipe에서 조회
	private int calcAlcCocktail(SqlSessionTemplate sst, List<RecipeVo> list) {
	    System.out.println("alc progress");

	    List<RecipeVo> selectList = sst.selectList("CocktailMapper.selectRecipeAlc", list);

	    int alc = 0;
	    int amount = 0;
	    
	    System.out.println("재료 파라미터 사이즈 : "+list.size());
	    System.out.println("조회 알코올 사이즈 : "+selectList.size());
	    
	    int result = 0;
	    try {
	    	//잘못된 재료번호 입력 시, nullPointException 발생
	    	for (int i = 0; i < list.size(); i++) {
	    		alc += list.get(i).getAmount() * selectList.get(i).getAlc();
	    		amount += list.get(i).getAmount();
	    	}
	    	
	    	// 0나누기 오류 방지
		    if (amount != 0) {
		        result = (int) Math.floor((double) alc / amount);
		    }
			
		} catch (Exception e) {
			System.out.println("알코올 계산 오류");
			e.printStackTrace();
			result = 0;
		}

	    System.out.println("ALC : "+result);
	    return result;
	}

}