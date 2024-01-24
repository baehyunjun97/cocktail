package com.kh.app.cocktail.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.kh.app.cocktail.service.CocktailService;
import com.kh.app.cocktail.vo.AmountVo;
import com.kh.app.cocktail.vo.CocktailVo;
import com.kh.app.cocktail.vo.IngVo;
import com.kh.app.cocktail.vo.RecipeVo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("cocktail")
@CrossOrigin("*") // 모든 출처 오픈 (칵테일사진)
@Slf4j
public class CocktailController {

	private final CocktailService service;
	private final HttpServletRequest req;

	@PostMapping("regist")
	public Map<String, Object> Regist(CocktailVo vo) throws IOException {

		Map<String, Object> map = null;

		try {
			map = new HashMap<String, Object>();
			log.info("React로 전달받은 CocktailVo"+vo);

			// recipeStr(json) => recipe setter
			String recipeListJsonStr = vo.getRecipeListJsonStr();
			Gson gson = new Gson();
			RecipeVo[] recipeArray = gson.fromJson(recipeListJsonStr, RecipeVo[].class);
			List<RecipeVo> recipeList = new ArrayList<RecipeVo>();

			for (RecipeVo recipe : recipeArray) {
				recipeList.add(recipe);
			}
			vo.setRecipe(recipeList);

			// 이미지 미등록 검사
			if (CollectionUtils.isEmpty(vo.getImgList())) {
				map.put("msg", "이미지를 입력해주세요.");
				return map;
			}

			// 이미지 저장
			List<String> filePaths = saveFile(vo.getImgList(), vo.getNameEng()); // 저장
			vo.setFilePaths(filePaths);

			int result = service.regist(vo);
			log.info("컨트롤러 결과 : " + result);
			map.put("msg", "칵테일 등록 성공");

			if (result == 2) {
				map.put("msg", "한글 이름을 입력해주세요");
			}
			if (result == 3) {
				map.put("msg", "영문 이름을 입력해주세요");
			}
			if (result == 4) {
				map.put("msg", "칵테일 설명을 입력해주세요");
			}
			if (result == 5) {
				map.put("msg", "레시피 설명을 입력해주세요");
			}
			if (result == 6) {
				map.put("msg", "재료를 입력해주세요");
			}

		} catch (Exception e) {
			log.error("칵테일 등록 실패");
			map.put("msg", "칵테일 등록 실패");
			e.printStackTrace();
		}

		return map;
	}

	private List<String> saveFile(List<MultipartFile> f, String cocktailName) throws Exception {

		String tomcatTopPath = req.getServletContext().getRealPath("/resources/upload/cocktail/image") + File.separator;
		log.info("Tomcat top path: " + tomcatTopPath);
		
		List<String> pathList = new ArrayList<String>();

		String imgDir = null;
		int iter = 1;
		for (MultipartFile img : f) {
			// 확장자 추출
			int pos = img.getOriginalFilename().lastIndexOf(".");
			String ext = img.getOriginalFilename().substring(pos + 1);

			imgDir = tomcatTopPath + cocktailName + "_" + iter + "." + ext;

			File target = new File(imgDir);
			img.transferTo(target);

			log.info("이미지 저장 경로 : " + imgDir);

			pathList.add(imgDir);
			iter++;
		}

		// filePaths용 반환
		return pathList;
	}

	// 재료검색
	@PostMapping("regist/ingList")
	public List<IngVo> searchIng(@RequestBody IngVo vo) {
		if (vo.getName().equals("null")) {
			return null;
		}
		List<IngVo> voList = service.searchIng(vo);
		return voList;
	}

	// 재료 용량 단위 전달
	@GetMapping("regist")
	public List<AmountVo> amountList() {
		return service.amountList();
	}

	// 칵테일 카테고리 전달
	@GetMapping("regist/category")
	public List<AmountVo> categoryList() {
		return service.categoryList();
	}

}
