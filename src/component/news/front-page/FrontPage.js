import React, { useEffect, useState } from 'react';
import { Spinner } from '../../common/spinner/Spinner';
import LineChart from '../linechart/LineChart';

import * as NewsService from '../NewsService';

const FrontPage = (props) => {
  const [newsList, setNewsList] = useState([]);
  const [hiddenList, setHiddenList] = useState({});
  const [voteDetails, setVoteDetails] = useState({});
  const [page, setPage] = useState(1);
  const [mapWidth, setMapWidth] = useState(250);

  useEffect(() => {
    if (props.location.pathname === '/') {
      props.history.push(`/page/${page}`);
      getFrontPageDetails(0);
    } else {
      const currentPage = props.location.pathname.split('/').pop();
      setPage(currentPage);
      getFrontPageDetails(currentPage - 1);
    }
    let ele = document.getElementsByClassName('App')[0];
    setMapWidth(ele.clientWidth);
    window.addEventListener('resize', () => {
      let ele = document.getElementsByClassName('App')[0];
      setMapWidth(ele.clientWidth);
    });
  }, []);

  const loadMessage = (page) => {
    const currentPage = page > 0 ? page : 0;
    props.history.push(`/page/${currentPage || 1}`);
    const pageNumber = currentPage - 1 >= 0 ? currentPage - 1 : 0;
    getFrontPageDetails(pageNumber);
  };

  const getFrontPageDetails = async (currentPage) => {
    try {
      const data = await NewsService.getFrontPageDetails(currentPage);
      if (data.status === 200 && data.data.hits.length) {
        let newsList = data.data.hits;
        setNewsList(newsList);
        filterVoting(newsList);
        filterHiddenList(newsList);
        setPage(parseInt(currentPage) + 1);
      } else {
        if (!newsList.length) {
          setPage(1);
          props.history.push(`/page/1`);
          getFrontPageDetails(0);
        } else {
          props.history.push(`/page/${page}`);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filterVoting = (newsList) => {
    const votingListFromStorage = JSON.parse(localStorage.getItem('voteDetails'));
    setVoteDetails(votingListFromStorage);
    const list = [...newsList];
    const voteDetailsState = { ...votingListFromStorage };

    list.forEach((news) => {
      if (!voteDetailsState.hasOwnProperty(news.objectID)) {
        voteDetailsState[news.objectID] = {
          objectID: news.objectID,
          points: news.points,
          created_at: news.created_at
        };
      } else {
      }
    });
    localStorage.setItem('voteDetails', JSON.stringify(voteDetailsState));
    setVoteDetails(voteDetailsState);
  };

  const filterHiddenList = (newsList) => {
    const hiddenListFromStorage = JSON.parse(localStorage.getItem('hiddenList'));
    setHiddenList(hiddenListFromStorage);
    const allNews = [...newsList];
    const hiddenListState = { ...hiddenListFromStorage };

    allNews.forEach((news) => {
      if (!hiddenListState.hasOwnProperty(news.objectID)) {
        hiddenListState[news.objectID] = {
          objectID: news.objectID,
          isVisible: true
        };
      }
    });
    localStorage.setItem('hiddenList', JSON.stringify(hiddenListState));
    setHiddenList(hiddenListState);
  };

  const upVote = (currentNews) => {
    const voteDetailsState = { ...voteDetails };
    voteDetailsState[currentNews.objectID].points =
      voteDetailsState[currentNews.objectID].points + 1;
    localStorage.setItem('voteDetails', JSON.stringify(voteDetailsState));
    setVoteDetails(voteDetailsState);
  };

  const hideThisNews = (currentNews) => {
    const hiddenListState = { ...hiddenList };
    hiddenListState[currentNews.objectID].isVisible = false;
    localStorage.setItem('hiddenList', JSON.stringify(hiddenListState));
    setHiddenList(hiddenListState);
  };

  const getNewsSource = (url) => {
    return url ? url.split('/')[2] : 'Source Unknown';
  };

  const getNewsPostDate = (createDate) => {
    return Math.round(
      (new Date().getTime() - new Date(createDate).getTime()) / (1000 * 60 * 60)
    );
  };

  return (
    <>
      <section id="newsHeaders" className="news-header">
        <header>
          <div className="row">
            <div className="col-sm-3 col-md-2">
              <div className="row">
                <div className="col-sm-4 col-4">
                  <span className="d-none d-lg-block">Comments</span>
                  <i
                    className="fa fa-comments d-lg-none pl-4"
                    aria-hidden="true"
                  ></i>
                </div>
                <div className="col-sm-4 col-4">
                  <span className="d-none d-lg-block pl-3">Vote</span>
                  <i className="fa fa-heart d-lg-none pl-3" aria-hidden="true"></i>
                </div>
                <div className="col-sm-4 col-4">
                  <span className="d-none d-lg-block">UpVote</span>
                  <i
                    className="fa fa-gratipay d-lg-none pl-sm-3"
                    aria-hidden="true"
                  ></i>
                </div>
              </div>
            </div>
            <div className="col-sm-9 col-md-10 text-left pl-4">
              <span className="d-none d-md-block">News Details</span>
              <i
                className="fa fa-bullhorn d-none d-sm-block d-md-none"
                aria-hidden="true"
              ></i>
            </div>
          </div>
        </header>
      </section>
      <section id="newsDetails" className="news-details container-fluid">
        {newsList.length === 0 && <Spinner />}
        {newsList.length > 0 &&
          newsList.map((news) => {
            return (
              hiddenList &&
              hiddenList[news.objectID] &&
              hiddenList[news.objectID].isVisible && (
                <div key={news.objectID} className="row p-2">
                  <div className="col-sm-3 col-md-2">
                    <div className="row">
                      <div className="col-sm-4 col-4 text-center">
                        {news.num_comments}
                      </div>
                      <div className="col-sm-4 col-4 text-center">
                        {voteDetails[news.objectID].points}
                      </div>
                      <div className="col-sm-4 col-4 text-center">
                        <i
                          className="fa fa-caret-up fa-2x text-black-50 pointer"
                          aria-hidden="true"
                          onClick={() => upVote(news)}
                        ></i>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-9 col-md-10 text-left announcement">
                    <div className="row m-0 p-0">
                      <div className="col-2 d-block d-sm-none">
                        <i
                          className="fa fa-2x fa-bullhorn mt-2"
                          aria-hidden="true"
                        ></i>
                      </div>
                      <div className="col-10 col-sm-12 px-0 position-relative announcement-text">
                        <article className="position-relative">
                          <header className="float-lg-left font-weight-bold mr-2">
                            <p className="m-0">{news.title}</p>
                          </header>
                          <section className="position-relative float-lg-left">
                            <div className="news-source float-left mr-2">
                              ({getNewsSource(news.url)})
                            </div>
                            <div className="float-left">
                              <span className="mr-2">by</span>
                              <span className="text-dark font-weight-bold mr-2">
                                {news.author}
                              </span>
                              <span className="mr-2">
                                {getNewsPostDate(news.created_at)} hours ago
                              </span>
                              <span
                                className="font-weight-bold mr-2 pointer"
                                onClick={() => hideThisNews(news)}
                              >
                                [ hide ]
                              </span>
                            </div>
                          </section>
                        </article>
                      </div>
                    </div>
                  </div>
                </div>
              )
            );
          })}
      </section>
      <section className="text-center text-md-right font-weight-bolder text-dark mt-4">
        <ul className="list-inline">
          <li className="list-inline-item border-right pr-2">
            <span
              className="text-xs-center pointer"
              title="Load previous"
              onClick={() => loadMessage(parseInt(page) - 1)}
            >
              Prev
            </span>
          </li>
          <li className="list-inline-item">
            <span
              className="text-xs-center pointer"
              title="Load next"
              onClick={() => loadMessage(parseInt(page) + 1)}
            >
              Next
            </span>
          </li>
        </ul>
      </section>
      <section>
        <LineChart
          newsList={newsList}
          voteDetails={voteDetails}
          hiddenList={hiddenList}
          width={mapWidth}
        />
      </section>
    </>
  );
};

export default FrontPage;
