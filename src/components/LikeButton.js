import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { Button, Label, Icon } from 'semantic-ui-react';

import HoverPopup from '../util/HoverPopup';

function LikeButton({ user, post: { id, likeCount, likes } }) {
	const [liked, setLiked] = useState(false);

	useEffect(() => {
		if (user && likes.find((like) => like.username === user.username)) {
			setLiked(true);
		} else setLiked(false);
	}, [user, likes]);

	const [likePost] = useMutation(LIKE_POST_MUTATION, {
		variables: { postId: id },
	});

	const likeButton = user ? (
		liked ? (
			<Button color='violet'>
				<Icon name='thumbs up' />
			</Button>
		) : (
			<Button color='violet' basic>
				<Icon name='thumbs up' />
			</Button>
		)
	) : (
		<Button as={Link} to='/login' color='violet' basic>
			<Icon name='thumbs up' />
		</Button>
	);

	return (
		<Button as='div' labelPosition='right' onClick={likePost}>
			<HoverPopup content={liked ? 'Unlike' : 'Like'}>{likeButton}</HoverPopup>
			<Label basic color='violet' pointing='left'>
				{likeCount}
			</Label>
		</Button>
	);
}

const LIKE_POST_MUTATION = gql`
	mutation likePost($postId: ID!) {
		likePost(postId: $postId) {
			id
			likes {
				id
				username
			}
			likeCount
		}
	}
`;

export default LikeButton;
