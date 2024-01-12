package com.kh.app.cocktail.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.kh.app.cocktail.service.CocktailService;
import com.kh.app.cocktail.vo.CocktailVo;
import com.kh.app.cocktail.vo.RecipeVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("cocktail")
@CrossOrigin("*") // 모든 출처 오픈 (칵테일사진)
public class CocktailController {

	private final CocktailService service;

//	@GetMapping("/regist")
//	public List<String> viewRegist() {
//		return Arrays.asList("Item 1", "Item 2", "Item 3");
//	}

	// TODO return good은 칵테일 리스트(기본화면)으로 이동시킨다. 가칭 home
	@PostMapping("regist")
	public Map<String, Object> Regist(CocktailVo vo) throws IOException {

		Map<String, Object> map = null;
		try {
			System.out.println(vo);
			System.out.println(vo.getImgList()); // multiFile

			//recipeStr(json) => recipe setter
			String recipeListJsonStr = vo.getRecipeListJsonStr();
			Gson gson = new Gson();
			RecipeVo[] recipeArray = gson.fromJson(recipeListJsonStr, RecipeVo[].class);
			List<RecipeVo> recipeList = new ArrayList<RecipeVo>();
			for (RecipeVo recipe : recipeArray) {
				recipeList.add(recipe);
			}
			vo.setRecipe(recipeList);

			//이미지 저장
			List<String> filePaths = saveFile(vo.getImgList(), vo.getNameEng()); // 저장
			vo.setFilePaths(filePaths);

			int result = service.regist(vo);
			System.out.println("컨트롤러 결과 : " + result);

			map = new HashMap<String, Object>();
			map.put("msg", "good");

		} catch (Exception e) {
			System.out.println("칵테일 등록 실패");
			map = new HashMap<String, Object>();
			map.put("msg", "bad");
			e.printStackTrace();
		}

		return map;
	}

	private List<String> saveFile(List<MultipartFile> f, String cocktailName) throws Exception {

		String projectDir = System.getProperty("user.dir");
		String userDir = projectDir.replace("setup\\sts3\\sts-bundle\\sts-3.9.18.RELEASE", "cocktailRepo\\javaCocktailWorkspace\\cocktailPrj");
		
		String relativePath = "src" + File.separator + "main" + File.separator + "webapp" + File.separator + "resources"+ File.separator + "upload" + File.separator + "cocktail" + File.separator + "image" + File.separator;
		String path = userDir + File.separator + relativePath;

		List<String> pathList = new ArrayList<String>();

		String imgDir = null;
		int iter = 1;
		for (MultipartFile img : f) {
			// 확장자 추출
			int pos = img.getOriginalFilename().lastIndexOf(".");
			String ext = img.getOriginalFilename().substring(pos + 1);

			imgDir = path + cocktailName + "_" + iter + "." + ext;

			File target = new File(imgDir);
			img.transferTo(target);

			System.out.println(imgDir);

			pathList.add(imgDir);
			iter++;
		}
		return pathList;
	}
}
