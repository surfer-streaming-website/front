import React from "react";

const AlbumItem = (props) => {
  // const { albumTitle,releaseDate,agency,albumContent,albumImage,albumState,albumRegDate  } = props.albumlist;
  const { albumTitle, albumState, albumRegDate } = props.albumlist;

  // 상태에 따른 텍스트 반환 함수
  const getAlbumStatus = (state) => {
    switch (state) {
      case 0:
        return "심사중";
      case 1:
        return "등록완료";
      case 2:
        return "반려됨";
      default:
        return "";
    }
  };

  // 날짜 형식을 yyyy-mm-dd로 변환하는 함수
  const formatDate = (date) => {
    const parsedDate = new Date(Number(date));
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
    
      <div>
        <table>
          <td>{albumTitle}</td>
          <td>{formatDate(albumRegDate)}</td>
          <td>{getAlbumStatus(albumState)}</td>
          {/* <td>{getAlbumStatus(albumState)}</td> */}
          {/* {(albumState === 0)(<td>심사중</td>)} */}
          {/* : (albumState === 1) ? 등록완료 } */}

          {(albumState === 0 || albumState === 2) && (
            <td>
              <button>수정</button>
            </td>
          )}

          {(albumState === 0 || albumState === 2) && (
            <td>
              <button>삭제</button>
            </td>
          )}
        </table>
      </div>
    </div>
  );
};

export default AlbumItem;
