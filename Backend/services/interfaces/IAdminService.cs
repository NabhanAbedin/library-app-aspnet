using Backend.models.dtos;


namespace Backend.services.interfaces;

public interface IAdminService
{
    public Task<IEnumerable<AdminCheckOutDto>> GetAllCheckOuts();
    public Task Updatecheckout(UpdateCheckoutDto checkoutDto);
}