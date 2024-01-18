package com.kh.app.cocktail.service;

import java.util.ArrayList;
import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import com.kh.app.cocktail.dao.CocktailDao;
import com.kh.app.cocktail.vo.AmountVo;
import com.kh.app.cocktail.vo.CocktailVo;
import com.kh.app.cocktail.vo.IngVo;
import com.kh.app.cocktail.vo.RecipeVo;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CocktailService {

	private final CocktailDao dao;
	private final SqlSessionTemplate sst;

	public int regist(CocktailVo vo) throws Exception {
		System.out.println("서비스 진행");

		// 이름 비었는지.
		if (vo.getNameKor().length() < 1) {
			return 2;
		};
		// 영어이름 비었는지.
		if (vo.getNameEng().length() < 1) {
			return 3;
		};
		// 설명 비었는지.
		if (vo.getCommentary().length() < 1) {
			return 4;
		};
		// 레시피 설명 비었는지.
		if (vo.getRecipeExplan().length() < 1) {
			return 5;
		};
		// 재료 비었는지
		List<RecipeVo> recipeList = vo.getRecipe();
		for (int i = 0; i < recipeList.size(); i++) {
			if (recipeList.get(i).getIngNo() == null || recipeList.get(i).getAmount() == 0) {
				return 6;
			};
		};

		// saveFiles 에서 사용한 Path를 이름으로 만들어 VO로 저장
		List<String> filePaths = vo.getFilePaths(); // . 다음 ext 가지고 있음
		List<String> nameList = new ArrayList<String>();

		int iter = 1;
		String ext = null;
		for (String path : filePaths) {
			ext = path.substring(path.lastIndexOf("."));
			String fileName = vo.getNameEng() + "_" + iter + ext;
			nameList.add(fileName);
			iter++;
		}

		System.out.println("src이름 리스트(service) : " + nameList);
		vo.setUrlPaths(nameList);

		return dao.regist(sst, vo);
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
