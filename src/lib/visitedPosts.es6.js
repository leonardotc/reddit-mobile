import uniq from 'lodash/array/uniq';
import cookies from 'cookies-js';

import constants from '../constants';
import localStorageAvailable from './localStorageAvailable';

// Return an array of ids of the posts the user has visited recently.
// Return [] if we are unable to access such a list.
export function getVisitedPosts(username) {
  const key = [username, constants.VISITED_POSTS_KEY].join('_');
  const localStorageString = localStorageAvailable() ? global.localStorage.getItem(key) : '';
  const localStorageArr = localStorageString ? localStorageString.split(',') : [];
  const cookieString = cookies.enabled ? cookies.get(key) : '';
  const cookieArr = cookieString ? cookieString.split(',') : [];

  return localStorageArr.concat(cookieArr);
}

// Stores the array of recently-visited post IDs.
// Stores only unique IDs and limited to VISITED_POST_COUNT.
// The posts should be provided in descending chronological order (most-recent
// first), so that the implementation provides us with the most recently
// visited posts.
// If we cannot store the list (no localStorage), then this is a silent no-op.
export function setVisitedPosts(username, posts) {
  const visited = uniq(posts);
  const visitedPostsKey = [username, constants.VISITED_POSTS_KEY].join('_');
  const recentClicksCookie = [username, constants.RECENT_CLICKS_COOKIE].join('_');
  const value = visited
    .slice(0, constants.RECENT_CLICKS_LENGTH)
    .join(',');

  if (localStorageAvailable()) {
    global.localStorage.setItem(visitedPostsKey, value);
  }

  cookies.set(recentClicksCookie, value);
}

