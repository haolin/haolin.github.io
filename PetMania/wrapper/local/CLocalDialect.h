//本地化

class CLocalDialect
{
public:
    static CLocalDialect* share();
    
    CLocalDialect();
    ~CLocalDialect();
    
    const char* textLocal(const char* key);
};