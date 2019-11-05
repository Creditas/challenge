export const filterByKeyword = (repos, keyword) => {
  if (repos.length) {
    return repos.filter(repo => (repo.name.toLowerCase()).includes(keyword.toLowerCase()));
  }
  return repos;
}
