import { Stack, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { PaperEditor } from 'commons/template/Paper';
import { useGetArticleQuery } from 'apps/website-display/redux/features/article/ArticleSlice';

const ArticlePaperEditor = ({ }) => {
	const { articleId } = useParams();
	const { data: article } = useGetArticleQuery({ articleId });

	return (
		<Stack spacing={2} maxWidth='md' sx={{ width: '100%', paddingBottom: 2 }}>
			<Typography
				align="center"
				component="h1"
				variant="h3"
				gutterBottom>
				{article?.name}
			</Typography>
			{article &&
				<PaperEditor paperId={articleId} />
			}
		</Stack>
	);
};

export default ArticlePaperEditor;
