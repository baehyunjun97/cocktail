package com.kh.app.cocktail.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.app.cocktail.vo.AmountVo;
import com.kh.app.cocktail.vo.CocktailVo;
import com.kh.app.cocktail.vo.IngVo;
import com.kh.app.cocktail.vo.RecipeVo;

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
		System.out.println("Src 등록개수 : " + result);
		return result;
	}

	// recipe 등록
	public int registRecipe(SqlSessionTemplate sst, CocktailVo vo) {
		try {
			int result = sst.insert("CocktailMapper.registRecipe", vo.getRecipe());
			System.out.println("레시피 등록개수 : " + result);
			return result;
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}

	// 칵테일 alc 계산 - recipe에서 조회
	private int calcAlcCocktail(SqlSessionTemplate sst, List<RecipeVo> list) {
		System.out.println("alc progress");

		List<RecipeVo> selectList = sst.selectList("CocktailMapper.selectRecipeAlc", list);

		int alc = 0;
		int amount = 0;

		System.out.println("재료 파라미터 사이즈 : " + list.size());
		System.out.println("조회 알코올 사이즈 : " + selectList.size());

		int result = 0;
		try {
			// 잘못된 재료번호 입력 시, nullPointException 발생
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

		System.out.println("ALC : " + result);
		return result;
	}

	// 재료 검색
	public List<IngVo> searchIng(SqlSessionTemplate sst, IngVo vo) {
		System.out.println(vo);
		return sst.selectList("CocktailMapper.selectIng", vo);
	}

	// 용량단위 리스트
	public List<AmountVo> amountList(SqlSessionTemplate sst) {
		return sst.selectList("CocktailMapper.amountList");
	}

	public List<AmountVo> categoryList(SqlSessionTemplate sst) {
		return sst.selectList("CocktailMapper.categoryList");
	}

}
