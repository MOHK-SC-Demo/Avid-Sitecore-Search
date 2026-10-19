"use client"

import { JSX } from 'react'
import { useParams } from 'next/navigation';

import { PAGE_EVENTS_PDP } from '@/app/_data/constants';
import withPageTracking from '@/app/_hocs/withPageTracking';
import ArticleDetailWidget from '@/app/_widgets/ArticleDetail';

const ArticleDetail = (): JSX.Element => {
  const params = useParams<{ slug: string;  }>()

  return <ArticleDetailWidget key={params?.slug} id={params?.slug} rfkId="avid_rfkid__7" />;
};

export default withPageTracking(ArticleDetail, PAGE_EVENTS_PDP);
