import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { cleanup, render, act } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

import LineChart from './news/linechart/LineChart';

describe('<LineChart />', () => {
  const response = {
    data: {
      hits: [
        {
          created_at: '2020-07-10T11:00:05.000Z',
          title:
            'App suddenly crashing on startup due to FBSDKRestrictiveDataFilterManager.m',
          url: 'https://github.com/facebook/facebook-ios-sdk/issues/1427',
          author: 'reubensutton',
          points: 547,
          story_text: null,
          comment_text: null,
          num_comments: 400,
          story_id: null,
          story_title: null,
          story_url: null,
          parent_id: null,
          created_at_i: 1594378805,
          _tags: ['story', 'author_reubensutton', 'story_23790207', 'front_page'],
          objectID: '23790207',
          _highlightResult: {
            title: {
              value:
                'App suddenly crashing on startup due to FBSDKRestrictiveDataFilterManager.m',
              matchLevel: 'none',
              matchedWords: []
            },
            url: {
              value: 'https://github.com/facebook/facebook-ios-sdk/issues/1427',
              matchLevel: 'none',
              matchedWords: []
            },
            author: {
              value: 'reubensutton',
              matchLevel: 'none',
              matchedWords: []
            }
          }
        },
        {
          created_at: '2020-07-10T19:13:43.000Z',
          title: "Don't close your MacBook with a cover over the camera",
          url: 'https://support.apple.com/en-us/HT211148',
          author: 'ra7',
          points: 523,
          story_text: null,
          comment_text: null,
          num_comments: 689,
          story_id: null,
          story_title: null,
          story_url: null,
          parent_id: null,
          created_at_i: 1594408423,
          _tags: ['story', 'author_ra7', 'story_23795163', 'front_page'],
          objectID: '23795163',
          _highlightResult: {
            title: {
              value: "Don't close your MacBook with a cover over the camera",
              matchLevel: 'none',
              matchedWords: []
            },
            url: {
              value: 'https://support.apple.com/en-us/HT211148',
              matchLevel: 'none',
              matchedWords: []
            },
            author: {
              value: 'ra7',
              matchLevel: 'none',
              matchedWords: []
            }
          }
        },
        {
          created_at: '2020-07-10T15:50:14.000Z',
          title:
            "Disabling Google 2FA doesn't need 2FA if you're already logged in",
          url: 'https://www.infoq.com/news/2020/07/google-password-2fa-woes/',
          author: 'Garbage',
          points: 342,
          story_text: null,
          comment_text: null,
          num_comments: 144,
          story_id: null,
          story_title: null,
          story_url: null,
          parent_id: null,
          created_at_i: 1594396214,
          _tags: ['story', 'author_Garbage', 'story_23792767', 'front_page'],
          objectID: '23792767',
          _highlightResult: {
            title: {
              value:
                "Disabling Google 2FA doesn't need 2FA if you're already logged in",
              matchLevel: 'none',
              matchedWords: []
            },
            url: {
              value:
                'https://www.infoq.com/news/2020/07/google-password-2fa-woes/',
              matchLevel: 'none',
              matchedWords: []
            },
            author: {
              value: 'Garbage',
              matchLevel: 'none',
              matchedWords: []
            }
          }
        }
      ]
    }
  };
  it('Should render without crash', () => {
    const newsList = response.data.hits;
    const voteDetails = {};
    const hiddenList = {};
    const mapWidth = 1000;
    const wrapper = shallow(
      <LineChart
        newsList={newsList}
        voteDetails={voteDetails}
        hiddenList={hiddenList}
        width={mapWidth}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});