import { getIdFromToken } from 'utils/jwt';

describe('decode jwt and get id', () => {
  it('should return id', () => {
    const token =
      'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NDIyNDY5MDYsImlhdCI6MTU0MjI0MzMwNiwiaWQiOjF9.NLqQDslOTbCGwJKamdIC8hp2_9p1AEBaaL6MF0Ign52x18DvvTf7tbKGDTBoyEBRPQU4EnMZ2N37TMX_nsIUm1ibBF2KOG5vm25gF-IxYqkkc0QVpSJwKSRUISlQCFeaCcJe4Ko5u9f8IJbimLx7Npq8H3bibOFaY9ZgQQIE0xzd5ep-MZpsekS5xYvt1tkxDPhkYCfnSH_weFkENvb3xzEhHdIVjBixKoNXnyUs7gFATdm9cyhKAQjo1JOP7zzxgCzSk38Sl2n5KiYHnh0bjpP4DRhUGLkNV6_NpmFdp2QiH5Hom4K1OYWJBl7FDA-Hpc3M__T2sQrAHOKQoW9xLu_cEB-URV_ZcvQR50ORPNjzAnEDoVWb2oS4iy7HjkxuNN_cdhWUhp90hJVcP-R3SsoGLZSbwn2XqQyTm_pbssWebm7tBHyAJwvVMgNZc2zu2A-vuhpKITOWoFrV5Jv4F0bWBIomi8BZI1noYCsBuM8fcs2ZeZL6IIw6IEsFMnyP0Tfgqz9sLOMi2JMCvAUi2Y1c5YVidE7JQUiPndsopwkZfeRUw6NAfZ-ERsUzN_TNnACH5JiElz6nHp-YRfQ6yW5ANF6j0LMmWISwD8dXFuMxHhXTGr30hx5AddHzUXih8IP2VKv9dRMgihpaIHjiS8UjSx3LViBEIFc90uQiXBY';
    const id = 1;
    expect(getIdFromToken(token)).toEqual(id);
  });

  it('what counts as a valid token?', () => {
    const token = 'xxx.xxx.xxx';
    const resp = false;
    expect(getIdFromToken(token)).toEqual(resp);
  });
});
