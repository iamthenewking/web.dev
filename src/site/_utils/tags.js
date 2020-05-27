/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const addPagination = require('./add-pagination');

/**
 * @param {any[]} tags
 * @param {string} language
 * @return {any[]}
 */
const tagsFeed = (tags, language = 'en') => {
  let filteredTags = [];

  if (process.env.ELEVENTY_ENV !== 'dev') {
    filteredTags = tags.reduce((accumulator, tag) => {
      const elements = tag.elements.filter(
        (e) => e.template.dataCache.lang === language,
      );

      if (elements.length > 0) {
        tag.elements = elements;
        accumulator.push(tag);
      }

      return accumulator;
    }, []);
  }

  return filteredTags;
};

/**
 * @param {any[]} tags
 * @param {string} language
 * @return {Paginated[]}
 */
const tagsIndex = (tags, language = 'en') => {
  const testTags = [
    'css',
    'javascript',
    'lighthouse',
    'seo',
    'progressive-web-apps',
    'webxr',
  ];
  const tagsWithPosts = tags.reduce((accumulator, tag) => {
    if (process.env.PERCY && !testTags.includes(tag.key)) {
      accumulator.push(tag);
    } else {
      const elements = tag.elements.filter(
        (e) => e.template.dataCache.lang === language,
      );

      if (elements.length > 0) {
        tag.elements = elements;
        accumulator.push(tag);
      }
    }

    return accumulator;
  }, []);

  return addPagination(tagsWithPosts, {href: '/tags/'});
};

/**
 * @param {any[]} tags
 * @param {string} language
 * @return {Paginated[]}
 */
const tagsIndividual = (tags, language = 'en') => {
  let paginated = [];

  tags.forEach((tag) => {
    const elements = tag.elements.filter(
      (e) => e.template.dataCache.lang === language,
    );

    if (elements.length > 0) {
      tag.elements = elements;
      paginated = paginated.concat(addPagination(tag.elements, tag));
    }
  });

  return paginated;
};

module.exports = {
  feed: tagsFeed,
  index: tagsIndex,
  individual: tagsIndividual,
};
