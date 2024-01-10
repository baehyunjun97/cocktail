package com.kh.app.bookmark.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.app.filter.vo.FilterVo;

@Repository
public class BookmarkDao {
	
	// 북마크 상태 확인
	public int findBookmarkStatus(SqlSessionTemplate sst, FilterVo vo) {
		return sst.selectOne("BookmarkMapper.status",vo);
	}

	// 북마크 생성
	public int createBookmark(SqlSessionTemplate sst, FilterVo vo) {
		return sst.insert("BookmarkMapper.create",vo);
	}

	// 북마크 삭제
	public int deleteBookmark(SqlSessionTemplate sst, FilterVo vo) {
		return sst.insert("BookmarkMapper.delete",vo);
	}

}
