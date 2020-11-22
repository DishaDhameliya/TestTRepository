using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Mvc;
using ShopBridgeWebAPI.Models;

namespace ShopBridgeWebAPI.Controllers
{
    [EnableCors(origins: "http://mywebclient.azurewebsites.net", headers: "*", methods: "*")]
    public class ShopBridgeWebApiController : ApiController
    {
        public static ShopBridgeEntities _entityRef;
        public ShopBridgeWebApiController() {
            _entityRef = new ShopBridgeEntities();
        }

        public async Task<List<shopbridge>> getAllData() {
            List<shopbridge> lstData = await _entityRef.shopbridges.ToListAsync();
            return lstData;
        }

        public async Task<shopbridge> getDataById(int id)
        {
            shopbridge item = await _entityRef.shopbridges.Where(x=>x.id == id).SingleOrDefaultAsync();           
            return item;
        }

        public async Task<string> updateItemById(shopbridge item)
        {
            shopbridge selitem = await _entityRef.shopbridges.Where(x => x.id == item.id).SingleOrDefaultAsync();
            selitem.name = item.name;
            selitem.description = item.description;
            selitem.price = item.price;
            _entityRef.SaveChanges();
            return null;
        }

        public async Task<string> deleteItemById(int id)
        {
            shopbridge selitem = await _entityRef.shopbridges.Where(x => x.id ==id).SingleOrDefaultAsync();
            _entityRef.shopbridges.Remove(selitem);
            _entityRef.SaveChanges();
            return null;
        }

        public async Task<string> addItem(shopbridge item)
        {
            shopbridge selitem = new shopbridge();
            selitem.name = item.name;
            selitem.description = item.description;
            selitem.price = item.price;
            _entityRef.shopbridges.Add(selitem);
            await _entityRef.SaveChangesAsync();
            return null;
        }


    }
}
