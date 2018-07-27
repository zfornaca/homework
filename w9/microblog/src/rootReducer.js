import uuid from 'uuid/v1';

const INITIAL_STATE = {
  posts: [
    // { title: 'Why is the sky blue?', body: 'Blah blah sky text.' },
    // { title: 'Why does the sun shine?', body: 'Blah blah sun text.' }
  ]
};

export default function rootReducer(state = INITIAL_STATE, action) {
  if (action.type === 'ADD_POST') {
    return {
      posts: [
        ...state.posts,
        { title: action.title, body: action.body, id: uuid() }
      ]
    };
  }
  if (action.type === 'DELETE_POST') {
    return {
      posts: state.posts.filter(post => action.id !== post.id)
    };
  }
  return state;
}
