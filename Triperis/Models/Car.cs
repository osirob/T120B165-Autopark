using System.ComponentModel.DataAnnotations;

namespace Triperis.Models
{
    public class Car
    {
        [Key]
        public int Id { get; set; }
        public string Marke { get; set; }
        public string Modelis { get; set; }
        public int Metai { get; set; }
        public string KuroTipas { get; set; }
        public string KebuloTipas { get; set; }
        public double VariklioTuris { get; set; }
        public int Galia { get; set; }
        public int Rida { get; set; }
        public bool Defektai { get; set; }
        public string Spalva { get; set; }
        public string PavaruDeze { get; set; }
        public string Aprasymas { get; set; }
        public DateTime SukurimoData { get; set; }
        public DateTime AtnaujintasData { get; set; }
        public bool Parduotas { get; set; }
        public int Kaina { get; set; }
        public string Vin { get; set; }
        public bool Ispejimas { get; set; }

        //Relationships
        public int UserId { get; set; }
        public AppUser User { get; set; }

        
        public List<Comment> Comments { get; set; }

       
        public List<Image> Images { get; set; }
    }
}
