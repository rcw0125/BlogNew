using System.Collections.Generic;
using System.Threading.Tasks;
using App.Application.Blog.Dtos;
using App.Core.Entities.Blog;
using App.Framwork.Result;

namespace App.Application.Blog
{
    public interface ICategoryService : IAppService<CategoryInfo>
    {
        /// <summary>
        /// 新增修改栏目
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        Task<UnifyResult> Save(CategoryInputDto dto);

        /// <summary>
        /// 获取所有一级分类
        /// </summary>
        /// <returns></returns>
        Task<List<CategoryDto>> GetRootCategories();

        /// <summary>
        /// 获取该目录下所有子目录，如果没有子目录，则返回上一级目录的子目录
        /// </summary>
        /// <param name="cid"></param>
        /// <returns></returns>
        Task<List<CategoryDto>> GetRootCategoriesByCid(string cid);
    }
}