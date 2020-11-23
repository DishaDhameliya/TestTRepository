using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.IO;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using ShopBridgeWebAPI.Models;
using Newtonsoft.Json;

namespace ShopBridgeWebAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    
    public class ShopBridgeWebApiController : ApiController
    {
        public static ShopBridgeEntities _entityRef;
        public ShopBridgeWebApiController() {
            _entityRef = new ShopBridgeEntities();
        }

        [HttpGet]
        [System.Web.Http.Route("getdata")]
        public async Task<List<shopbridge>> getAllData() {
            try
            {
                List<shopbridge> lstData = await _entityRef.shopbridges.ToListAsync();
                return lstData;
            }
            catch (Exception)
            {

                throw;
            }
        }

        [Route("getDataById/{id}")]
        public async Task<shopbridge> getDataById(int id)
        {
            try
            {
                shopbridge item = await _entityRef.shopbridges.Where(x => x.id == id).SingleOrDefaultAsync();
                return item;
            }
            catch (Exception)
            {

                throw;
            }
        }

        [Route("updateItem/{id}")]
        public async Task<string> updateItemById(int id,shopbridge item)
        {
            try
            {
                shopbridge selitem = await _entityRef.shopbridges.Where(x => x.id == id).SingleOrDefaultAsync();
                selitem.name = item.name;
                selitem.description = item.description;
                selitem.price = item.price;
                _entityRef.SaveChanges();
                return "success";

            }
            catch (Exception)
            {

                throw;
            }
        }

        [Route("deleteItem/{id}")]
        public async Task<string> deleteItemById(int id)
        {
            try
            {
                shopbridge selitem = await _entityRef.shopbridges.Where(x => x.id == id).SingleOrDefaultAsync();
                _entityRef.shopbridges.Remove(selitem);
                _entityRef.SaveChanges();
                return "success";
            }
            catch (Exception)
            {

                throw;
            }
        }

        [Route("addItem")]
        public async Task<string> addItem()
        {
            try
            {
                HttpRequest request = System.Web.HttpContext.Current.Request;
                HttpPostedFile file = request.Files["file[]"];
                string strFilename = string.Empty;
                if ( file != null && file.ContentLength > 0)
                {
                    string _FileName = Path.GetFileName(file.FileName);
                    strFilename = Guid.NewGuid() + _FileName;
                    string _path = Path.Combine(System.Web.HttpContext.Current.Server.MapPath("~/Image"), strFilename);
                    file.SaveAs(_path);
                }
                shopbridge selitem = JsonConvert.DeserializeObject<shopbridge>(System.Web.HttpContext.Current.Request.Form["data"]);
                selitem.image = strFilename;
                _entityRef.shopbridges.Add(selitem);
                await _entityRef.SaveChangesAsync();
                return "success";

            }
            catch (Exception ex)
            {

                throw;
            }
        }


    }
}
