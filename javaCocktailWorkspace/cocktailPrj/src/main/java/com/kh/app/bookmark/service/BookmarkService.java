package com.kh.app.bookmark.service;

import java.util.HashMap;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kh.app.bookmark.dao.BookmarkDao;
import com.kh.app.filter.vo.FilterVo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
@Transactional
public class BookmarkService {
	private final BookmarkDao dao;
	private final SqlSessionTemplate sst;

	public Map<String, String> toggleBookmarkAndCheckStatus(FilterVo vo) {
		
		Map<String, String> bookmarkMap = new HashMap<>(); 
		
		// 북마크 상태가 1이면 누름 0이면 안누름
		if(vo.getLikeStatus() == 1) {
			
			// 삭제가 성공하면 good저장 실패하면 bad저장
			int result = dao.deleteBookmark(sst,vo);
			
			bookmarkMap.put("msg","bad");
			if(result==1) {
				bookmarkMap.put("msg","deleteSuccess");
			}
			
		}else if(vo.getLikeStatus() == 0) {
			
			// 생성이 성공하면 good저장 실패하면 bad저장
			int result = dao.createBookmark(sst,vo);
			
			bookmarkMap.put("msg","bad");
			if(result==1) {
				bookmarkMap.put("msg","createSuccess");
			}
			
		}else {
			// 만약 조회시 문제발생시 bad저장(예: 2이상 결과나옴)
			bookmarkMap.put("msg", "bad");
		}
		
		return bookmarkMap;
		
	}

	// 북마크 상태 조회
	public Map<String,String> findBookmarkStatus(FilterVo vo) {
		
		// status값을 받아서 할당  1이면 누름 0은 안누름
		int bookmarkStatus = dao.findBookmarkStatus(sst, vo);
		
		Map<String, String> map = new HashMap<>();
		
		// map에 상태값 저장
		map.put("status", "x");
		if(bookmarkStatus == 1) {
			map.put("status", "o");
		}
		
		return map;
	}
	
}