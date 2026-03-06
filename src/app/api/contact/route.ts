import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const RECIPIENT_EMAIL = "adilayroofing@gmail.com";

// Base64-encoded logo-red.png — embedded so it works on Vercel serverless
// (public/ files are served by CDN, not available on the filesystem)
const LOGO_BASE64 = "iVBORw0KGgoAAAANSUhEUgAAAZAAAAD9CAYAAACSoiH8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAgAElEQVR4nO2deZwkRZXHE9D1Xg8WpjOzZkaHroialunMpp2ZiqhmW8QDD1aBnVV3Fc/1VrxWvK91FQ9QFFS8F8SDwwthXRcRFEQQvMCDgXHoiqwehpvhGo6Z2c/Lqh66s6qrM7MyM6Kqft/PJ/6B6cyojOMXES/ee5YFAAAAAAAAAAAAAAAAoB+pV8uHKcletMuy9tBdFwAAAH1AvVp2A8HOCCTf1SqX1AVbq7teAAAADGXX9PSDlOBHKclvmyceYVGS7wgkO+nGdaN/r7ueAAAADGJ2qjIZSH5pVDjaimCzqlo+Und9AQAAaGZmas1jA8mOb+4wlhCPBTsSdtasWL1Sd/0BAAAUDBnGaSehBL8+iXBEROROJdjRuzZYe6EBAQBgCAgk50ryc9MKR5uQCP67erW8TvfvAgAAkBNbp8ceqST7ZCDZvVmJxzwRuT8Q/Dh6BxoQAAAGiIZkz1WC17MWjnYhYTNBjR+q+/cCAADokRnJnUDy0/IWjk5G9uDA/ZajAQEAoA99OgLJ3qoEu71o8XhARPhtjVrlDbssa0/d3wMAAEAMAjE6Ecunozgh+e2M5E9C4wEAgKFsmlz16NCngwzaBghHxDZyH9UNRnYAADAMMlwXYSTPoASqVjlc9/cCAIChpxX48EwDhCHhsRY7S60bLQ19AwLQTwSCvzyQ7OpA8E39XJRgH7GGmMsmJx/ckOwd5A2uWwxSF8FvCSR/DYzsAPQJgeSf1j5xZLGCFeyn1pDSqLJaINkfdbdBZm0p2UX1Kl+j+7sCAJZACfY53RMGBKTYwIf9UGBkB6APgID0J4HgG5TkW3VP9PkLCf9bvcoO0f29AQAdgID0F7Pry6sDyc7XPbEXLiSSfeu69fsv0/39AQDzgID0B/Vq6WFK8A8Ggm/XPZlrK4LfQhkSYWQHwBAgIOajJD9ISf4X7RO4SUZ2Udlfd7sAMPRAQMyDjmgCwV4XSH6r7ona+CL4NXXBn6G7zQAYSiAgZqFqZS8Q7GLtE3OfFYSLB0ADEBAzaExOPjyQ/Jjm0Yz+CbkfixLsDuRkB6BAICCGBD6U7FrdE/DAFMF/r2qVqu52BWDggYDoic7IPkzKMG26Z5oB70oya5T1fKRuyxrDw1NDcBgAwEpltmpymQg2G90T6zDV9j5s1OjYwU3NwCDDQSk0MCHXxzEwId9UwTfrgT/0ObplQ8tqNkBGGwgIPlTl/zf6ChF+wSKMrcb2RgIdnABTQ/AYAMByY8ZObpfINlPMHEbK16nbRGr9s2xCwAw2EBA8skOSP4IgeB3GzBJonQ/1kKARgDSAgHJlroo/6OS/M+YuPtLuJTgv5yprX5ixt0BgMEGApINdBRCgQ+V5Dt1T4Yoab8Bu0cJ9hEKnZ9RtwBgsIGA9DbA7qK83VeOjf0dutdgQX465CuhJL9N/yRuiJG9Vnma7nYBYFEgIINQBmvFSrfnkHdk4Y5y4yGjD9HdLgC0AQHp6xXqzkDykxvT7B8GrWvvDnIp2T26v7MZhV0dVMtP1d0uACwAAtK35Q+BrIhB787kt6IE+5UB39uIBYOS7Kt0TV13uwAQAgHps0lEsDsCwd9O3t3D0oWbMcz4awLBb9H9/U0oSvDrg1rlJYNyZAn6GAhIH00ckp21ZT1/vDWkkD8LHdnpbgdTihL8F7NTo2O62wUMMRCQPiiCNeiaq+6+YpiRHXlc+vTaNhggICAGrzAl3xFIdlKS7IDDAozs0UUGv6Yu+DN0twsYMiAgxpZLKBS67v7RF0Z2yS4yoL0MKezULWLVvrrbBQwJEBDjyq2BYK83JfBh33iyy/K/w5N9t4iQR/9LYWQHuQMBMctIrtaNltDt01Gvjj2OjvwQhXl3n7ogkJyjP4HcgIDoFw6cX2fep58CT/bdi5I7G5K947LJyQdn/JkBgIDov0HDjt8yPv4I9MVsoQlTCXZ0IPjd2hcIRhT2x0BwiX4GMgU7EG2D+oLZ9eXV6M75QsEIKSih/gncnFt9M1NrHos+BzIBAqIjOyA/CkbyYglq/FDKRa57EjejDFbwTaARCEihgQ//e3ZqdB90eD3QyjuQ7IvNlbjuSVx/CXdmfRz+HxgABKSAgSrYX8l7WndbgyYUhDK0CRgwiWsvoY2IfQDh4kEqICB5DlCEmTAVCkZJR4lKsNu1T+ImFMGvacjK03W3C+gzICC5Dcq+zg44LFBwykDyH2ufwE0pgp8CT3YQGwhItgNQSb5VCfZiGCj7CyX5ETCyz4kIu5k8+9GHwZJAQDITjoHNDjgskD8ORbZVgt+vfSdgQFGSXzhTW/1E3e0CDAYCksVgY1c0qqymuy1BNsxI/iQl2GW6J3AzCrtHSf5hhIsHHYGA9DTA7qK83VeOjf0dutdgQX465CuhJL9N/yRuiJG9Vnma7nYBhgEBST2gzt5yIHuC7vYD+XLtgRUbWRAX9P3T4MsEdgMBSSocbBbZAYcPJcrPVpJt1r4TMCaaAjzZAQQk9qAhwyqJ7Y3rRv8eHWd4jexKsE+0/Hv0T+T6C46qDzvYgcQSj9+pqfJ63W0FzABZEOePDzjLDjUQkG7CwbaFgQ83WHvpbidgppGdjnMM2AkYUNjGQLCDdbcLKBgIyCIDQrAz6tWyiw4JunHd+v2XKcm+pX8CN6WwUzevHRtBrxkSlOBf0d/pzClK8DqF/tbdLqC/UDX2TBjZeXMcCX5LINjrkbJgCDp9IPmtuidtE0rT+5h9Zuv02CN1twsoTxqTkw9Xkn1SCXaf7v5sSLl0dqoyqbtdQMbUq2OPo8xkrfAbujuZ/iL47+vVsdGl83for2ixRfDttFWle+GF9UYAQN/Sivt3wjDG/VOCHR3rI1HGvOH5KPwXs1OjY7n3PADAwDB0TtWC/z92znW6tjXo+TzCoGqCvwxGcgBAGnZNTz+oIdk7lGR3DvRcGTqQJ8xp1EoKNYDCEQZRO5nue2PYAAAyyb4q2U90T565FcE+mkpdaduivfKZFnZ1Q1aejiEDAMjFk13yrfrnueyKEuyq1A7UjRqbGgyPTHZvIPkx8CQHAOTJ5umVj6HUDkrw+/tePCTf0ZDlA3v6IIHgX+pz8Ti/0Hj3AIChZ3aqMhlIfmmfC8gJPTdkvTr2uH7clinJrqtL/m9D35MBAFrYRWYAyd7ap7mTFPkFZvIhaCLuI9XcoQT/vDE5fwEAQ41aN1oKJP+e7rkxSalXy4dl+xEk/78+EI/fdo3VkjGUTIqi9JJ7/1JFSX4ibWutAglq/NBAsi/GqV+qIthnKTtlINnzG1VW05kjRUn2nzHr/cVZsXpl0ucHgr0vVjsL9rl6la+x+jr+E/9Y/H6Q8HrnImwRq/ZN0vfqVf6vVgEE1fJTw/wYS4/vE5Y6Kg9E5Tn9kBpDSf79zD8kubCbGlRMCXYHeUnSltEqEEpKn6yu7I9F+p0Ekp1afHuwLUqwHynB30QxhIr4nTdI/qhkA4S9KOk7lGDbEnyD11p9CmXZTNjmP8vwuOePsd8r+N2JwoyngPpv3DlPCbaNUmAs9cx6tfQwSh8bSHaP7nlzsd9BO6ZcPmgg+Ht1/8AOg/X0erXsWhogL/bE9a2WnzrYAtJhVyj4UVunxx6Z1++kjJmJ6lQtH5n0HaHjadx3CPZ6qw8hT2Ml2Ezyds5mF1IX5X9MdOtT8LOtHFGC/W/8fs7ekuTZ9M0CyS/RPT6jpVGrvCG3D3rl2NjfKcH/pPtHtkqgapXDLU2oWqWaqt6CnzNMAvLAAOO30fXGOKu0pEBALK22TopeneEO6JuJJjzBnpfVuxfWg29IUI8/pDn9oNMIyvrXHBv6xyjdGtu1wdrLyhOKVqvTN4Tc6pXgx9KkYWlECf6DlBPpTrWejQ+bgMxrv210MyXL40YISDYEgv86VbsKvv269fsvy6IOZEdLMqEqya5tTE4+3MoQel7cnZiSfCfZ/3p5H52gBIKdqXdssnuLmpdoO/81PZMP/11dsLWWZshY1ks0TiXZV4dVQHYXwX5DISCy+J0QEI076gfKe6yMoAVGsnmBfcTKkKaNIva7v57de8vP1mhkP8YqitA3pMDk8xSsLDSS5729ikkg+Jd7mzz59iJuLBktIK2AlqrGn9zr74SA9I6S7Fu99WnWiB2tNZZBnf8h/vvZPVmlnSYDMl3Kidd/+W1Zj+Pm7qdYIzuJVuEnOpTutZgfx79PqXYtQ2g6VmYQfVOw/xp2AZkb/L3asiAgvTEjudMK99NTW2Z5tTZpGCVyM8jivUrw75hgcA4KNLJriQ9IBqBAsPPy+lHhVq7GD7UMQ9Uq78rkNwp2c103k/pHQGhwu7txXIKA9AYdAWU0Zi+3dPZfwTcUdQuMjtN35XwiQn5mrWvVt+Y29gT7pqWLYKrCsvcNaQY+zNowltXWWglez+q31iV/Y571TTQABd+uJL+QVnIxy4VkwGxmc8yk3e9Je8UZApKe5rdjN2XVp5XkB1kZ7oyS+d9wlXZRRsdvgWBXxvyNOwPBpVXsDvH0PI6QyYHT0knTQzejHyT4L+uisr9lKAmv9sWZtDfluYpJIiD07dPuRMnzOnQcFOynvdzQow6dxkscApKeZiSBTCem/7EyJBD8bQnnkI+n+w7snToM55qN7C+1dEO+IXGVu9vEEQj+ctOzA9KqO97viX9DK/OYM+mPAC7I5p2ct0I7pLylxn6S9J0QkB521LEnpHg2kvCaeq3sZVnHQLIrEvSfe5OmqN6ynj8+tl1T8Ft0rtq3jI8/gtwYmlkCexKPnxkz39I96NQThuCn9EN2wETXHGuVl8Q/6mLnmyEg2dYjkBWR2uk0oe0LApJ/KJ664M+In+aanWplSIq8RBckmRyVYD80wlM7aU72tEZ2we8uKsxQbJpBxRL9iE3UKa0+IW40TbIL0LFUkrAvM5I/adAEhCA7Fh1ppOjg12w8ZPQhcd8DAUkHGb2THG/G9f+i1TGt6q0MoYVmkj7UEJUXxnkuebInGCNXFB1vb0lP9mr5yERhdpq7xHdbprFpctWj6S54nM5FIS10e5InvSyQYIf1H/Q3FLIj9rY/pzNV3QKy+4gzRShrJdiL474CApIcJdhTkgafbFQrB8RvP36slSHk6U7HRwn68xaak5b0uYh5hEc7IIrCYRnI5nCu4SfH26WxK7Ly18kcCuvdtfKCXVyYu3yGNEOix+q4d5GfyLy/O73oUBDpb2Gxn1t5nttK/udkIhJf0CAgyaGIyTGF4Pr5qaCVZBfFXABsyywh0e468zcl6kOCH7fE8z6e4Hn/bRlOo1Z5WiDZ1V1EcAcdxVsmQ8ECOzQkrRxeQ/earT4jzFMQP6TzN+b/bSDYwQkmzA9oFpDzrBwhw2qSPNHhamqqwuI8GwKSjNBoHLctIg6v5CwYuw0Ff5OVIXQ0TP4X8d/P7lvMoN8K1b5dl8d5XpDYK8E/1Om3ZZKiNm/oGub8FI5KsrN0hVvPgmbCqHS2jNDZUrKNMQVkS5Jz/34TkDTn2BS+Js5zISCJ2+G4mAJwf6M2tqL9SJJtiden+DVZLxrJ/yKRh7rgv+xkUE9im8taCIuA8jctCEcv2GzfZGlVVfbm8OpdgbkvclTzWDG/lGC/6vUee5o8FRle480kMVA36HplMgHhP4jzXAhIfOhYKYFn8/d69VxvSPZcK2PoOClRP4qMKyX5EXmHajeFoMb+hS4sKVl+ltVPmBL4sBfINyV2RxPlF3R8xtrK3vG99bPNWJjIkVDyc7N67xJ1in2nX0m+Nc4zISAJvr/gb4/dpxdZADZPGWIfgWVuW0tqUFeSXTe3+g4zAg6A4XzY5uK+hLLpxRwks7S1z+LoJsurzSYKiBLsE0lWj3GOPyEgSTIOxvNPUoL9tdtiho6mY/etDB0L573/LUn6USDYZ5PunnR5nIMBIMk1x6UM4OQIpWMiTyggmUQzXbpO/J+SDPw4t0YgIPGg67ixv3uVvblrO4rKc+JPxPwrVsYk9VCnHRPFnosdu02wm7XHiQL9S8fbZJ1XKffFWSXT8VTczj47VZkcVAFJCu1Gqq/N9/WWRAI79M9Bw0MeBKOT6E75HGex/0f+jjmzf3QekIvQf8PCAldO47xXoI+fGi4EoLmzY8vKeXceMFpBWYOIPhxUMef2vSCB+q4d5GfyLy/O73oUBDpb2Gxn1t5nttK/udkIhJf0CwgyaGIyTGF4Pr5qaCVZBfFXABsyywh0e468zcl6kOCH7fE8z6e4Hn/bRlOo1Z5WiDZ1V1EcAcdxVsmQ8ECOzQkrRxeQ/earT4jzFMQP6TzN+b8HAcmJ0GgeI/bSdpqm8B7DdEEaoeEa2a0ZONh3HJ3gYZaJHGGBPFCi8qoknble5WuKbolAsCvjDza+tdsq3hQBaeWK+N7sVGUyj282zAKSxHZGocuLzvlN174TxkH7Q6+OhRAQYECeAHaejmZQgr8p0WRSq7zERAEhQ2qS8P6h7A9dxi6yMoTuapxfemRuJ4u2rNfnkZ6RY/vFdQoC+oTyb+tsE+oeqPvkNpDseIjs7u90OYXqL27kAmAAEJAmgeRcSX6u7gnblBKm2K3xQ5fqP40am1KC/0l3fc0o7N5AsI/Ckx0MDcMuIDTYQ58Owbfr/g3G3DSS7PgbJH9UsuCRYYbF23XX34gCT3YwLAyzgCjBnqIE+6vuurtAhIpdEBwY0yotyfZy8W0sN03U+hu3RPJnH74+0Cys7MxlCfkLH8WheKmvCANwP4RO16ndfMBsL+2S6UfaI7cGcgU7EG2D+oLZ9eXV6M75QsEI6Sih/gncnFt9M1NrHos+BzIBAqIjOyA/CkbyYglq/FDKRa57EjejDFbwTaARCEi5gb4U3YhAWUaDWsfO51QTqJHQPL9d0D+DIDh5m4Fp1YPo+0LApJ/KJ664M+In+aanWplSIq8RBckmRyVYD80wlM7aU72tEZ2we8uKsxQbJpBxRL9iE3UKa0+IW40TbIL0LFUkrAvM5I/adAEhCA7Fh1ppOjg12w8ZPQhcd8DAUkHGb2THG/G9f+i1TGt6q0MoYVmkj7UEJUXxnkuebInGCNXFB1vb0lP9mr5yERhdpq7xHdbprFpctWj6S54nM5FIS10e5InvSyQYIf1H/Q3FLIj9rY/pzNV3QKy+4gzRShrJdiL474CApIcJdhTkgafbFQrB8RvP36slSHk6U7HRwn68xaak5b0uYh5hEc7IIrCYRnI5nCu4SfH26WxK7Ly18kcCuvdtfKCXVyYu3yGNEOix+q4d5GfyLy/O73oUBDpb2Gxn1t5nttK/udkIhJf0CAgyaGIyTGF4Pr5qaCVZBfFXABsyywh0e468zcl6kOCH7fE8z6e4Hn/bRlOo1Z5WiDZ1V1EcAcdxVsmQ8ECOzQkrRxeQ/earT4jzFMQP6TzN+b/bSDYwQkmzA9oFpDzrBwhw2qSPNHhamqqwuI8GwKSjNBoHLctIg6v5CwYuw0Ff5OVIXQ0TP4X8d/P7lvMoN8K1b5dl8d5XpDYK8E/1Om3ZZKiNm/oGub8FI5KsrN0hVvPgmbCqHS2jNDZUrKNMQVkS5Jz/34TkDTn2BS+Js5zISCJ2+G4mAJwf6M2tqL9SJJtiden+DVZLxrJ/yKRh7rgv+xkUE9im8taCIuA8jctCEcv2GzfZGlVVfbm8OpdgbkvclTzWDG/lGC/6vUee5o8FRle480kMVA36HplMgHhP4jzXAhIfOpZKYFn8/d69VxvSPZcK2PoOClRP4qMKyX5EXmHajeFoMb+hS4sKVl+ltVPmBL4sBfINyV2RxPlF3R8xtrK3vG99bPNWJjIkVDyc7N67xJ1in2nX0m+Nc4zISAJvr/gb4/dpxdZADZPGWIfgWVuW0tqUFeSXTe3+g4zAg6A4XzY5uK+hLLpxRwks7S1z+LoJsurzSYKiBLsE0lWj3GOPyEgSTIOxvNPUoL9tdtiho6mY/etDB0L573/LUn6USDYZ5PunnR5nIMBIMk1x6UM4OQIpWMiTyggmUQzXbpO/J+SDPw4t0YgIPGg67ixv3uVvblrO4rKc+JPxPwrVsYk9VCnHRPFnosdu02wm7XHiQL9S8fbZJ1XKffFWSXT8VTczj47VZkcVAGJCu1GtKIg2eqetWNBj0AWkdS00wWqQf2ChZ0Ie7c1MjSQKHNF/777wadVxWbgRsX1Gem67+PnKEvd8bfWlxtO9UnYkyPeZw2sAIy4j8zjoC03ndqm4jY3oeLEpCoz0rzAgrydwADaD/f9/6Sx3tK9sQbIyvyv3b9947/gciA/aGlkVZ+hQWTSDd7DA3yBfV3vScXW+MlJkHb+0acv4OA7N49Xx5p/500doqQkGgUA9fxf5LkvQAUGI3XuzqX99j+JZH3fL7rv28GZNRy/bUTZLCMHgMtFjai6TzYtmrPJBJxWigCcURAzo3zdxCQJtR+HWJPbVu+zHti/gIS5osxZiwA0G0Hcm3Wn6cZRj1yBLBElNiS45/SIWyJVqITyGLhHZrh5hf+3jzyoSTBHfFencbW1TEfiO2/kM7gsypJbxNlklBqZOKQuEdYc1DmxzAawcJvcVXcq9lpBaSZN2bBEda74vwdAH0vIGEu5vYYQ5cv9XclxzvDtEETDWBHoesX91+JTLqaw2BTLuzIKvbPpiSUSrKK1ykg4btt/91ti6Hm8eqeue1AIo6Nru2/ySqIZv6ZZu4fKjpSVYP+uoW1Matn0+rStf0gMuB2xMlRQUdcpl1bbIsGvMhNpk5HWFnFU0pLyRl/eURA/mSKgFCwySS/JZuUtuPPSCMgrQjT32v/Hd57c9yBnBB5139YBRG9DEKRgIt6N+jPW1h/6/WZoddsGAOqU7pW76OxntFmRPe/Zmkk9AWJ/B7HWcPj+7ws/m+LoOT4b48IyPnGpLRN4BlvgIBYdHuwQxKvHUuFuEkvIN4Hiwwk2vU2Yc6pnkH/70BujPu3e+/NH0ViQQEPKWRGmJY0TDUbOSd+oHw67lXcNuc327vY0gh5IEcnjG52jTCl7sLJ4tBia9xWn69EBORb6VNaekfvTovaY6Hr2itWrHlsPwnI7qNZ27s1ssi5pZtvU2oBGZl4cWSR931Lk4DY9mSlqHeDPqBDmA4qO+kaausq6qJ5kuMWGmhkxE1SL9tec0Bk1XWnzpzMUT8QWoEmCXxX5KqxE9F4Xq7tvzP1DqTLJNk/KW29p/ciIPMChC4YH+Qxvliumx78QCYidW0U5RMVFRDXnRgv4r2gvwUkkxJm3HP8Ly0VN2rRxDm2d9fCzjv+FEsTlEsjsoL/crd/79r+UZEd1EWWJppxnRZOdItdAIgnILFzzg+0gBCUXbOt3zv+9zpN8OlDmUw/KMwIuOBvPd/ScYSV4luDASYvASFnp17DrlOu8MggPzG7X56gHk1HstsXCoL/wm5/Q1v9yDfZqcsOUrK9d0SE/Ra42es6CUiR4fTzExD/aVkISBitOTy2jYwB23tHprGwHP8nC9/hHW9pMaJ3j18HhoxOkWZd2z+25PjHLFXoSmN4Hh7aPhb6bbQi567I8uYQOW6tXOk9xiqY6G6CjuTiRAVuS8OrIRgk7eToanZkcvvvuH8PAVkaumEXZi6MjCO6KpxZNF7bf0W0DxYRnLMtrD3yooMl/EC6xnhanA17lRz/wsgxzwW9xOwhsYgeYxXtUBjeuLG9RpqdUHTlT3YcSjKVf627J8SKG0hxkAWk6RSYyQ5kXqy3hTfv6Nr3/GgFvQgIjQVaQEX602esoo+w7PGpvN8J+voWll/PMgVsnPvx3aBVe2Sg301xqXp5ZqL3t+Vj9+6nW2dx/pb8Qdq+R4FReWll3JbTwvZ/luQZEJBeAm42M0DO7VZ7zUgYHQt0rTzvIyUcYYHCBKT1vCOjndx1D6imfV4rrPvt0bzkRSSWal71bLuS/KVEz4j4s7S+yeut/NmjZPs/am8L30vykMEVkImDs9yBzFGy/S+2t7d/ShYCQmHdw6vCC8aC/7eREX8fq6gjrJK3Lq93gT4kawEJn2l73452cvIZSf88/02dbrrQ+b6VE5R7pH2weluSnjuHQRijibEc7366AmrliGt7n2z7ZrZ/bNLnQEASfq9me/+6w7c/KhpSP6mAEMsd/7UddjkX9zK+uoFbWKBwAWme13ozkY5+Ug+P3KNke2d3WMmf0y2nSFrIRtAhHe0OSkKU5nmuO76ejt4iK967es2x3ZkNe7UfdYTid2maFKiDKiDRXPFZ7UCaz15Tao//1h6VIY2AhGPB8c/sIFCX0G49q9+w+C2s8Yms3wH6mDwEhFhurzkwevzTizd2eNMlktaztframOG2moTqDdHJPonj3RJHezs7OGwem9VxHMUpomx57XX3GmmN9xCQtG3hS9f27+lwnNWrgDTbxPZ/26md4/r3xKEZFHThQhCOhKAQAQmfbfufiKzCrqdz3LTPa6b29P7SYSdyX5hytgcHN0r4FM1ZMu+47ONWBrSOH3Z0qP+1zd1IuhtrrUn+/e0XGELhCyjsRto6Q0DSQ4uRPASEoKPUaHSBeYuS7/Ti8EcLmuaRW3t/Sho5GQw4eQpIGIAwslJyHe8HGdwsOmcxz/cwUqrtHRbnuIac/SjVLOXGWGSQ02T/9l7q21Z/Z+IFbU6J84QkNLrHyP2+cuX0Q8nI38rV3vF5lBys1xtrgysg3kF5HWF1i0GWlYDsjkXXdlFiQbkw9KWKEXqGxkvrWO/T0Wya88buZTr8sMCQCghB+bOj9+NpJd7jY/ek/CDR50bE5B4SBgoaGHGAPKVke7/qkF0ucjTmqyyPA+ZDHuk0GLu+P7x+651DmRkfcNj0P0JRiWmn1ME/Jvr3J2dhWIWA9AYJ/WI7214FpMWetAhaqj+EuWxIbMJbYmH4lWNoZ02pjl3H+023sRQeRdv+cWlsaGDAyVtACLq2Glnt3Z3FWWorzegZWQR8nC88ru19Kv/EORv2cm3vVSXH35pV3ZsThX+lOzJ+eFa1HGABeXIROxBixYpJm56fk4CE0C6jdftxR7b9ybsgieMpGDLckYkj8haQTreowiuNGWXpa+5y/JOWXpV3Ew5vloSDbtBYBULnzaFtxPav6mGg73Ad/5d0PBYnM14SWh7QAycglIOkKAGZe59re/fmJSCRtAOnLH5MGm8RRcFDSWSzrh8YMELjseNvmisUwDCP94QG8PBI6YF3ZZ2aMww7MjJ+eOvc+fJWNODFBklASZVc2/twa4VVSHjsbpCHe8nx31ayvXM7XCOeP9ndSzfSWsdzr6MVbl51Cs/GHe+yB9rNO1/3OTi1bWgvsv065V2hBUSqbJkL+r3/cytnaCc+/510Uyu3d5WqD2stDk8iP5ElBOX28Lqu7X2BcrTobl8ADGH6QSRcNDHThEGFbpHozk8eF8orQfUlWwytsilHCoWLydOBEgwse1LiLuo/1KfoCJnidEEsAAAAAAAAAAAAAACwBpX/BykGYRwnU4cEAAAAAElFTkSuQmCC";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message } = body;

    // Validate required fields
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    // Logo as base64 buffer for CID attachment (works on Vercel serverless)

    // Build the email HTML
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #ffffff; padding: 24px 24px 16px; text-align: center; border-bottom: 1px solid #e0e0e0;">
          <img src="cid:adilay-logo" alt="Adilay Roofing" width="200" style="display: inline-block; max-width: 200px; height: auto;" />
        </div>
        <div style="background-color: #C41E1E; padding: 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px;">New Contact Form Submission</h1>
        </div>
        <div style="padding: 30px; background-color: #f9f9f9; border: 1px solid #e0e0e0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; width: 140px; vertical-align: top;">Full Name:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; vertical-align: top;">Email:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; vertical-align: top;">Phone:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${phone || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; vertical-align: top;">Service Needed:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${service}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; vertical-align: top;">Message:</td>
              <td style="padding: 10px 0; white-space: pre-wrap;">${message}</td>
            </tr>
          </table>
        </div>
        <div style="padding: 15px; text-align: center; color: #888; font-size: 12px;">
          This lead was submitted from the Adilay Roofing website contact form.
        </div>
      </div>
    `;

    // Plain text fallback
    const text = `
NEW CONTACT FORM SUBMISSION
============================
Full Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Service Needed: ${service}
Message: ${message}
============================
Submitted from Adilay Roofing website.
    `.trim();

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send email with embedded logo
    await transporter.sendMail({
      from: `"Adilay Roofing Website" <${process.env.SMTP_USER}>`,
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: `New Contact Form: ${name} — ${service}`,
      text,
      html,
      attachments: [
        {
          filename: "logo-red.png",
          content: Buffer.from(LOGO_BASE64, "base64"),
          cid: "adilay-logo",
        },
      ],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again or call us directly." },
      { status: 500 }
    );
  }
}
