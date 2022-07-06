using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using WebApplication4.Models;

namespace WebApplication4.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public DoctorController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select doctorID, firstName, lastName, insurance, address, phoneNumber from dbo.Doctor";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("HospitalAppConnection");
            SqlDataReader myReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Doctor doc)
        {
            string query = @"
                insert into dbo.Doctor values (
                '" + doc.firstName + @"', 
                '" + doc.lastName + @"', 
                '" + doc.insurance + @"', 
                '" + doc.address + @"', 
                '" + doc.phoneNumber + @"')";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("HospitalAppConnection");
            SqlDataReader myReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Succesfully.");
        }

        [HttpPut]
        public JsonResult Put(Doctor doc)
        {
            string query = @"
                update dbo.Doctor set 
                firstName = '" + doc.firstName + @"',
                lastName = '" + doc.lastName + @"',
                insurance = '" + doc.insurance + @"',
                address = '" + doc.address + @"',
                phoneNumber = '" + doc.phoneNumber + @"'
                where doctorID = " + doc.doctorID + @"
                ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("HospitalAppConnection");
            SqlDataReader myReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Update Succesfully.");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                delete from dbo.Doctor
                where doctorID = " + id + @"
                ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("HospitalAppConnection");
            SqlDataReader myReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Delete Succesfully.");
        }
    }
}