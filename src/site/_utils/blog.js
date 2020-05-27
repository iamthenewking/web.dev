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
 * @param {any[]} blogPosts
 * @param {string} language
 * @return {Paginated[]}
 */
const blogIndex = (blogPosts, language = 'en') => {
  const filteredBlogPosts = blogPosts.filter(
    (blogPost) => blogPost.template.dataCache.lang === language,
  );

  return addPagination(filteredBlogPosts, {href: '/blog/'});
};

module.exports = {
  index: blogIndex,
};
