package com.kh.app.bookmark.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.app.bookmark.service.BookmarkService;
import com.kh.app.filter.vo.FilterVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("bookmark")
@CrossOrigin
public class BookmarkController {
	
	private final BookmarkService service;

	// 북마크상태 확인후 저장 또는 삭제 진행
	@PostMapping
	public Map<String,String> toggleBookmarkAndCheckStatus(@RequestBody FilterVo vo) {
        return service.toggleBookmarkAndCheckStatus(vo);
    }
	
	// 북마크상태 확인후 저장 또는 삭제 진행
	@PostMapping("status")
	public Map<String,String> findBookmarkStatus(@RequestBody FilterVo vo) {
        return service.findBookmarkStatus(vo);
    }

	
}