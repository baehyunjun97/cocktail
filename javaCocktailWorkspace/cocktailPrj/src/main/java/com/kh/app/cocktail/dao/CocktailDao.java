package com.kh.app.cocktail.dao;

import java.util.ArrayList;
import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.app.cocktail.vo.AmountVo;
import com.kh.app.cocktail.vo.CocktailVo;
import com.kh.app.cocktail.vo.IngVo;
import com.kh.app.cocktail.vo.RecipeVo;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Repository
public class CocktailDao {

	// 칵테일 등록
	public int regist(SqlSessionTemplate sst, CocktailVo vo) throws Exception {
		int registRecipe = registRecipe(sst, vo);
		int insertSrc = insertSrc(sst, vo.getUrlPaths()); // list 여기서 ext 주기...?

		if (insertSrc < 1) {
			throw new Exception("이미지 등록 실패");
		}

		if (registRecipe < 1) {
			throw new Exception("레시피 등록 실패");
		}

		int alc = calcAlcCocktail(sst, vo.getRecipe());
		int item = vo.getRecipe().size();
		vo.setAlc(alc);
		vo.setItem(item);

		return sst.insert("CocktailMapper.registCocktail", vo);
	}

	// img src 등록
	private int insertSrc(SqlSessionTemplate sst, List<String> list) {
		int result = sst.insert("CocktailMapper.insertSrc", list);
		log.info("Src 등록개수 : " + result);
		return result;
	}

	// recipe 등록
	public int registRecipe(SqlSessionTemplate sst, CocktailVo vo) {
		try {
			int result = sst.insert("CocktailMapper.registRecipe", vo.getRecipe());
			log.info("레시피 등록개수 : " + result);
			return result;
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}

	// 칵테일 alc 계산 - recipe에서 조회
	private int calcAlcCocktail(SqlSessionTemplate sst, List<RecipeVo> list) {
		
		//RecipeVo 에 amountNo가 ml(==1) 이 아닌 요소는 알코올 계산에서 제외
		List<RecipeVo> searchList = new ArrayList<RecipeVo>();
		for (RecipeVo recipeVo : list) {
			if( recipeVo.getAmountNo().equals("1")) {
				searchList.add(recipeVo);
			}
		};
		
		List<RecipeVo> alcList = sst.selectList("CocktailMapper.selectRecipeAlc", searchList);
		

		int alc = 0;
		int amount = 0;
		
		log.debug("재료 파라미터 사이즈 : " + list.size());
		log.debug("조회 알코올 사이즈 : " + alcList.size());

		int result = 0;
		try {
			// 잘못된 재료번호 입력 시, nullPointException 발생
			for (int i = 0; i < alcList.size(); i++) {
				alc += searchList.get(i).getAmount() * alcList.get(i).getAlc();
				amount += searchList.get(i).getAmount();
			}

			// 0나누기 오류 방지
			if (amount != 0) {
				result = (int) Math.ceil((double) alc / amount);
			} else {
				throw new Exception("Alc 계산 오류");
			}

		} catch (Exception e) {
			e.printStackTrace();
			result = 0;
		}
		log.info("ALC : " + result);
		
		return result;
	}

	// 재료 검색
	public List<IngVo> searchIng(SqlSessionTemplate sst, IngVo vo) {
		return sst.selectList("CocktailMapper.selectIng", vo);
	}

	// 용량단위 리스트
	public List<AmountVo> amountList(SqlSessionTemplate sst) {
		return sst.selectList("CocktailMapper.amountList");
	}

	//카테고리 리스트
	public List<AmountVo> categoryList(SqlSessionTemplate sst) {
		return sst.selectList("CocktailMapper.categoryList");
	}

}
