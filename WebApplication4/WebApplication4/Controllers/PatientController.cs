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
    public class PatientController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public PatientController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select patientID, firstName, lastName, insurance, address, phoneNumber from dbo.Patient";
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
        public JsonResult Post(Patient pat)
        {
            string query = @"
                insert into dbo.Patient values (
                '" + pat.firstName + @"', 
                '" + pat.lastName + @"', 
                '" + pat.insurance + @"', 
                '" + pat.address + @"', 
                '" + pat.phoneNumber + @"')";

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
        public JsonResult Put(Patient pat)
        {
            string query = @"
                update dbo.Patient set 
                firstName = '" + pat.firstName + @"',
                lastName = '" + pat.lastName + @"',
                insurance = '" + pat.insurance + @"',
                address = '" + pat.address + @"',
                phoneNumber = '" + pat.phoneNumber + @"'
                where patientID = " + pat.patientID + @"
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
                delete from dbo.Patient
                where patientID = " + id + @"
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