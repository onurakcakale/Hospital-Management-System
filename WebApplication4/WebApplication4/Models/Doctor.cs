using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication4.Models
{
    public class Doctor
    {
        public int doctorID { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string insurance { get; set; }
        public string address { get; set; }
        public string phoneNumber { get; set; }
    }
}